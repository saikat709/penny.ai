
package com.penny.repositories;

import com.penny.models.Transaction;
import com.penny.models.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findAll(Pageable pageable);
    List<Transaction> findAllByUserAndTimestampBetween(UserEntity user, OffsetDateTime start, OffsetDateTime end);
    Optional<List<Transaction>> findByUserId(Long userId);
    List<Transaction> findAllByTimestamp(OffsetDateTime dateTime);
}
