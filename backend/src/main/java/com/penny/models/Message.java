
package com.penny.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @Column(name = "sender", nullable = false, length = 50)
    private String sender;

    @CreationTimestamp
    @Column(name = "timestamp", nullable = false)
    private OffsetDateTime timestamp;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL)
    private List<MessagePart> parts;
}
