
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MessageCreateUpdateDTO {
    private Long conversationId;
    private String type;
    private String sender;
    private List<MessagePartCreateUpdateDTO> parts = new java.util.ArrayList<>();
}
