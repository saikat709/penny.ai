
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ConversationDTO {
    private Long id;
    private Long userId;
    private String title;
    private List<MessageDTO> messages;
    private OffsetDateTime timestamp;
}
