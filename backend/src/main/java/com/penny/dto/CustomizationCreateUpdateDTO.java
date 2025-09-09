
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomizationCreateUpdateDTO {
    private Long userId;
    private Integer reportFreq;
    private String theme;
    private String persona;
}
