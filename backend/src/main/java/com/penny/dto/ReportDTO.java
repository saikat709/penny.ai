
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReportDTO {
    private Long id;
    private Long userId;
    private Integer freq;
    private Double income;
    private Double expense;
    private List<Long> transactionIds;
    private List<Long> sharedWithUserIds;
}
