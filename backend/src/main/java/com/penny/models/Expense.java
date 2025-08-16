package com.penny.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "expenses",
        indexes = {
                @Index(name = "idx_expenses_user_id", columnList = "user_id"),
                @Index(name = "idx_expenses_category_id", columnList = "category_id"),
                @Index(name = "idx_expenses_date", columnList = "date")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category; // RESTRICT on delete at DB level (no cascade here)

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDate date;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "receipt_url", length = 255)
    private String receiptUrl;

    @Column(name = "voice_memo_url", length = 255)
    private String voiceMemoUrl;

    @Column(name = "is_automated")
    private Boolean automated = Boolean.FALSE;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
}
