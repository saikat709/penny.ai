
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MessageDTO {
    private Long id;
    private Long conversationId;
    private String type;
    private String sender;
    private OffsetDateTime timestamp;
    private List<MessagePartDTO> parts;
}
