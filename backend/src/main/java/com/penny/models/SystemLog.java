package com.penny.models;

import com.penny.models.enums.Severity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "system_logs",
        indexes = {
                @Index(name = "idx_system_logs_admin_id", columnList = "admin_id")
        })
@Getter
@Setter
@NoArgsConstructor
public class SystemLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Optional admin association; on delete admin => set null handled at DB level.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private UserEntity admin;

    @Column(name = "event_type", nullable = false, length = 50)
    private String eventType;

    @Column(columnDefinition = "text", nullable = false)
    private String description;

    @CreationTimestamp
    @Column(nullable = false)
    private OffsetDateTime timestamp;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Severity severity = Severity.INFO;
}
