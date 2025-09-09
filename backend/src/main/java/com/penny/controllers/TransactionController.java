
package com.penny.controllers;

import com.penny.dto.TransactionCreateUpdateDTO;
import com.penny.dto.TransactionDTO;
import com.penny.services.TransactionService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public Page<TransactionDTO> getTransactions(
            @RequestParam(defaultValue = "0")      int page,
            @RequestParam(defaultValue = "10")     int size,
            @RequestParam(defaultValue = "id,asc") String[] sort
    ) {
        Sort sorting = Sort.by(sort[0].split(",")[0]);
        if (sort[0].split(",").length > 1 && sort[0].split(",")[1].equalsIgnoreCase("desc")) {
            sorting = sorting.descending();
        } else {
            sorting = sorting.ascending();
        }
        Pageable pageable = PageRequest.of(page, size, sorting);
        return transactionService.getTransactions(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TransactionDTO createTransaction(@RequestBody TransactionCreateUpdateDTO transaction) {
        return transactionService.createTransaction(transaction);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(@PathVariable Long id, @RequestBody TransactionCreateUpdateDTO transactionDetails) {
        return transactionService.updateTransaction(id, transactionDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
