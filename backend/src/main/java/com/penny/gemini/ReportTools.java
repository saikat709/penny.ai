package com.penny.gemini;

import com.penny.dto.ExpenseReportDTO;
import com.penny.dto.TransactionDTO;
import com.penny.models.Transaction;
import com.penny.models.UserEntity;
import com.penny.repositories.TransactionRepository;
import com.penny.repositories.UserRepository;
import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ReportTools {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    @Tool("Get a comprehensive expense report for a user within a specified date range.")
    public ExpenseReportDTO getExpenseReport(
            @P("Start (ISO 8601). Accepts '2025-09-01' or '2025-09-01T00:00:00Z'.") String startDateString,
            @P("End (ISO 8601). Accepts '2025-09-30' or '2025-09-30T23:59:59Z'.") String endDateString,
            @P("The ID of the user for this report") Long userId
    ) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        DateRange range = parseToOffsetRange(startDateString, endDateString);

        List<Transaction> before = transactionRepository.findAllByUserAndTimestampBefore(user, range.startInclusive);
        BigDecimal balanceBefore = before.stream()
                .map(t -> isIncome(t) ? bd(t.getAmount()) : bd(t.getAmount()).negate())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Transaction> tx = transactionRepository
                .findAllByUserAndTimestampGreaterThanEqualAndTimestampLessThan(user, range.startInclusive, range.endExclusive);

        BigDecimal totalIncome = tx.stream().filter(this::isIncome)
                .map(t -> bd(t.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = tx.stream().filter(this::isExpense)
                .map(t -> bd(t.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal balanceAfter = balanceBefore.add(totalIncome).subtract(totalExpense);

        long days = Math.max(1, ChronoUnit.DAYS.between(
                range.startInclusive.toLocalDate(),
                range.endExclusive.toLocalDate()
        ));

        BigDecimal averageDailyExpense = days == 0 ? BigDecimal.ZERO
                : totalExpense.divide(BigDecimal.valueOf(days), 2, RoundingMode.HALF_UP);

        Map<String, Double> expenseByCategory = tx.stream()
                .filter(this::isExpense)
                .collect(Collectors.groupingBy(
                        t -> {
                            String name = (t.getCategory() != null ? t.getCategory().getName() : null);
                            name = (name == null || name.trim().isEmpty()) ? "Uncategorized" : name.trim();
                            return name;
                        },
                        Collectors.reducing(BigDecimal.ZERO, tr -> bd(tr.getAmount()), BigDecimal::add)
                ))
                .entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().doubleValue()));

        String mostExpensiveCategory = expenseByCategory.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);

        return ExpenseReportDTO.builder()
                .totalIncome(totalIncome.doubleValue())
                .totalExpense(totalExpense.doubleValue())
                .balanceBefore(balanceBefore.doubleValue())
                .balanceAfter(balanceAfter.doubleValue())
                .averageDailyExpense(averageDailyExpense.doubleValue())
                .mostExpensiveCategory(mostExpensiveCategory)
                .expenseByCategory(expenseByCategory)
                .transactions(tx.stream().map(this::toDto).collect(Collectors.toList()))
                .build();
    }

    private DateRange parseToOffsetRange(String startStr, String endStr) {
        OffsetDateTime start = parseFlexibleStart(startStr);
        OffsetDateTime endParsed = parseFlexibleEndRaw(endStr);

        // make end exclusive
        final OffsetDateTime endExclusive = looksLikeDateOnly(endStr)
                ? endParsed.toLocalDate().plusDays(1).atStartOfDay().atOffset(ZoneOffset.UTC)
                : endParsed.plusNanos(1);

        if (!endExclusive.isAfter(start)) throw new IllegalArgumentException("End must be after start.");
        return new DateRange(start, endExclusive);
    }

    private OffsetDateTime parseFlexibleStart(String s) {
        s = s.trim();
        if (looksLikeDateOnly(s)) {
            LocalDate d = LocalDate.parse(s, DateTimeFormatter.ISO_LOCAL_DATE);
            return d.atStartOfDay().atOffset(ZoneOffset.UTC);
        }
        return OffsetDateTime.parse(s, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }

    private OffsetDateTime parseFlexibleEndRaw(String s) {
        s = s.trim();
        if (looksLikeDateOnly(s)) {
            LocalDate d = LocalDate.parse(s, DateTimeFormatter.ISO_LOCAL_DATE);
            return d.atStartOfDay().atOffset(ZoneOffset.UTC);
        }
        return OffsetDateTime.parse(s, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }

    private boolean looksLikeDateOnly(String s) {
        return s.length() == 10 && s.charAt(4) == '-' && s.charAt(7) == '-';
    }

    private boolean isIncome(Transaction t) {
        return t.getType() != null && t.getType().equalsIgnoreCase("income");
    }

    private boolean isExpense(Transaction t) {
        return t.getType() != null && t.getType().equalsIgnoreCase("expense");
    }

    private BigDecimal bd(double v) { return BigDecimal.valueOf(v); }

    private static final class DateRange {
        final OffsetDateTime startInclusive;
        final OffsetDateTime endExclusive;
        DateRange(OffsetDateTime s, OffsetDateTime e) { this.startInclusive = s; this.endExclusive = e; }
    }

    private TransactionDTO toDto(Transaction transaction) {
        return getTransactionDTO(transaction);
    }

    @NotNull
    static TransactionDTO getTransactionDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setAmount(transaction.getAmount());
        dto.setType(transaction.getType());
        dto.setTimestamp(transaction.getTimestamp().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
        dto.setDescription(transaction.getDescription());
        dto.setCategoryId(transaction.getCategory().getId());
        return dto;
    }
}
