package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class ChatResponseDTO {
    Long userId;
    Long conversationId;
    String type;
    List<MessagePartDTO> parts;
}
