package com.penny.models;

import com.penny.models.enums.ActionStatus;
import com.penny.models.enums.ActionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.Map;

@Entity
@Table(name = "action_logs",
        indexes = {
                @Index(name = "idx_action_logs_user_id", columnList = "user_id")
        })
@Getter
@Setter
@NoArgsConstructor
public class ActionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ActionType type;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    private Map<String, Object> details;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ActionStatus status = ActionStatus.PENDING;

    @CreationTimestamp
    @Column(nullable = false)
    private OffsetDateTime timestamp;

    @Column(name = "error_message", columnDefinition = "text")
    private String errorMessage;
}
