package com.penny.models;

import com.penny.models.enums.RecurrenceFrequency;
import jakarta.persistence.*;
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
@Table(name = "incomes",
        indexes = {
                @Index(name = "idx_incomes_user_id", columnList = "user_id")
        })
@Getter
@Setter
@NoArgsConstructor
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDate date;

    @Column(length = 100)
    private String source;

    @Column(name = "is_recurring")
    private Boolean recurring = Boolean.FALSE;

    @Enumerated(EnumType.STRING)
    @Column(name = "recurrence_frequency", length = 10)
    private RecurrenceFrequency recurrenceFrequency; // optional

    @Column(columnDefinition = "text")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
}
