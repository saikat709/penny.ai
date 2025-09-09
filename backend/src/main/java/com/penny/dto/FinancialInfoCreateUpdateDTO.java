
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FinancialInfoCreateUpdateDTO {
    private Long userId;
    private Integer freq;
    private String currency;
    private String item;
    private String description;
}
