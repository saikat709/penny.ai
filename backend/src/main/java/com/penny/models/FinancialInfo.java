
package com.penny.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "financial_info")
@Getter
@Setter
@NoArgsConstructor
public class FinancialInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "freq", nullable = false)
    private Integer freq;

    @Column(name = "currency", nullable = false, length = 10)
    private String currency;

    @Column(name = "item", nullable = false, length = 100)
    private String item;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
