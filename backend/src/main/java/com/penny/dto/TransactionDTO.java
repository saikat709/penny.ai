
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TransactionDTO {
    private Long id;
    private Long userId;
    private Double amount;
    private String type;
    private OffsetDateTime timestamp;
    private String description;
    private Long categoryId;
}
