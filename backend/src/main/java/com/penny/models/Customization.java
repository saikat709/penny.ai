
package com.penny.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customizations")
@Getter
@Setter
@NoArgsConstructor
public class Customization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "report_freq", nullable = false)
    private Integer reportFreq;

    @Column(name = "theme", nullable = false, length = 50)
    private String theme;

    @Column(name = "persona", nullable = false, length = 50)
    private String persona;
}
