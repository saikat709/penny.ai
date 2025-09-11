package com.penny.gemini;

import com.penny.dto.TransactionDTO;
import com.penny.models.Category;
import com.penny.models.Transaction;
import com.penny.models.UserEntity;
import com.penny.repositories.CategoryRepository;
import com.penny.repositories.TransactionRepository;
import com.penny.repositories.UserRepository;
import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TransactionTools {

    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Tool("Add a new transaction for the user.")
    public TransactionDTO addTransaction(
            @P("The amount of the transaction.") double amount,
            @P("The type of the transaction (e.g., expense, income).") String type,
            @P("A description of the transaction.") String description,
            @P("The name of the category for this transaction.") String categoryName,
            @P("The ID of the user for this transaction") Long userId
    ) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setType(type);
        transaction.setDescription(description);
        transaction.setTimestamp(OffsetDateTime.now());
        transaction.setUser(user);

        Category category = categoryRepository.findByName(categoryName);
        if (category == null) {
            // Create new category if not found
            category = new Category();
            category.setName(categoryName);
            category.setSlug(categoryName.toLowerCase().replace(" ", "-")); // Simple slug generation
            categoryRepository.save(category);
        }
        transaction.setCategory(category);

        Transaction savedTransaction = transactionRepository.save(transaction);
        return toDto(savedTransaction);
    }

    @Tool("Get a list of transactions for the user within a specified date range.")
    public List<TransactionDTO> getTransactionsBetweenDates(
            @P("The start date for the transaction list (ISO 8601 format, e.g., '2023-01-01T00:00:00Z').") String startDateString,
            @P("The end date for the transaction list (ISO 8601 format, e.g., '2023-01-31T23:59:59Z').") String endDateString,
            @P("The ID of the user for this transaction") Long userId
    ) {
        System.out.println("getTransactionsBetweenDates called with:");

        System.out.println("  startDateString: " + startDateString);
        System.out.println("  endDateString: " + endDateString);
        System.out.println("  userId: " + userId);

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        OffsetDateTime startDate = OffsetDateTime.parse(startDateString, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        OffsetDateTime endDate = OffsetDateTime.parse(endDateString, DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        List<Transaction> transactions = transactionRepository.findAllByUserAndTimestampBetween(user, startDate, endDate);

        System.out.println("TRANS: " + transactions.toString());
        return transactions.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Tool("Get last transaction")
    public TransactionDTO getLastTransaction(
            @P("User id of the current user") Long userId
    ) {
        Optional<List<Transaction>> lastTrans = transactionRepository.findByUserId(userId);
        return lastTrans.isEmpty() ? null :  toDto(lastTrans.get().get(0));
    }

    @Tool("Get a category by its name.")
    public Category getCategoryByName(@P("The name of the category.") String name) {
        return categoryRepository.findByName(name);
    }

    private TransactionDTO toDto(Transaction transaction) {
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
