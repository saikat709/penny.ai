
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TransactionDTO {
    private Long id;
    private Double amount;
    private String type;
    private String timestamp;
    private String description;
    private Long categoryId;
}
