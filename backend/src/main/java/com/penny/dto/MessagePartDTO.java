
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MessagePartDTO {
    private Long id;
    private Long messageId;
    private String type;
    private String data;
}
