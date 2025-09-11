
package com.penny.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "message_parts")
@Getter
@Setter
@NoArgsConstructor
public class MessagePart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "message_id", nullable = false)
    private Message message;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @Column(columnDefinition = "TEXT")
    private String data;
}
