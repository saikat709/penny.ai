
package com.penny.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "freq", nullable = false)
    private Integer freq;

    @Column(name = "income", nullable = false)
    private Double income;

    @Column(name = "expense", nullable = false)
    private Double expense;

    @OneToMany
    @JoinColumn(name = "transaction_id")
    private List<Transaction> transactions;

    @ManyToMany
    @JoinTable(
            name = "report_shared_with",
            joinColumns = @JoinColumn(name = "report_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<UserEntity> sharedWith;
}
