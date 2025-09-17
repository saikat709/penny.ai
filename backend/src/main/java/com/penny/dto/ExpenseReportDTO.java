package com.penny.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
public class ExpenseReportDTO {
    private double totalIncome;
    private double totalExpense;
    private double balanceBefore;
    private double balanceAfter;
    private double averageDailyExpense;
    private String mostExpensiveCategory;
    private Map<String, Double> expenseByCategory;
    private List<TransactionDTO> transactions;
}
