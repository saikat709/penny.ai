
package com.penny.services;

import com.penny.dto.TransactionCreateUpdateDTO;
import com.penny.dto.TransactionDTO;
import com.penny.models.Category;
import com.penny.models.Transaction;
import com.penny.models.UserEntity;
import com.penny.repositories.CategoryRepository;
import com.penny.repositories.TransactionRepository;
import com.penny.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public Page<TransactionDTO> getTransactions(Pageable pageable) {
        return transactionRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<TransactionDTO> getTransactionById(Long id) {
        return transactionRepository.findById(id).map(this::convertToDTO);
    }

    public TransactionDTO createTransaction(TransactionCreateUpdateDTO transactionDTO) {
        UserEntity user = userRepository.findById(transactionDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = null;
        if (transactionDTO.getCategoryId() != null) {
            category = categoryRepository.findById(transactionDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
        }

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setType(transactionDTO.getType());
        transaction.setDescription(transactionDTO.getDescription());
        transaction.setCategory(category);

        return convertToDTO(transactionRepository.save(transaction));
    }

    public Optional<TransactionDTO> updateTransaction(Long id, TransactionCreateUpdateDTO transactionDetails) {
        return transactionRepository.findById(id)
                .map(transaction -> {
                    if (transactionDetails.getAmount() != null) {
                        transaction.setAmount(transactionDetails.getAmount());
                    }
                    if (transactionDetails.getType() != null) {
                        transaction.setType(transactionDetails.getType());
                    }
                    if (transactionDetails.getDescription() != null) {
                        transaction.setDescription(transactionDetails.getDescription());
                    }
                    if (transactionDetails.getCategoryId() != null) {
                        Category category = categoryRepository.findById(transactionDetails.getCategoryId())
                                .orElseThrow(() -> new RuntimeException("Category not found"));
                        transaction.setCategory(category);
                    }
                    return convertToDTO(transactionRepository.save(transaction));
                });
    }

    private TransactionDTO convertToDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setId(transaction.getUser().getId());
        dto.setAmount(transaction.getAmount());
        dto.setType(transaction.getType());
        dto.setTimestamp(String.valueOf(transaction.getTimestamp()));
        dto.setDescription(transaction.getDescription());
        if (transaction.getCategory() != null) {
            dto.setCategoryId(transaction.getCategory().getId());
        }
        return dto;
    }
}
