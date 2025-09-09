
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomizationDTO {
    private Long id;
    private Long userId;
    private Integer reportFreq;
    private String theme;
    private String persona;
}
