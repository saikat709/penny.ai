
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TransactionCreateUpdateDTO {
    private Long userId;
    private Double amount;
    private String type;
    private String description;
    private Long categoryId;
}
