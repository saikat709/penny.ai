
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
public class SubscriptionCreateUpdateDTO {
    private Long userId;
    private Double amount;
    private OffsetDateTime date;
    private Boolean isRecurring;
    private Boolean autoPay;
}
