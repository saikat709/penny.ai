
package com.penny.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ProfileCreateUpdateDTO {
    private Long userId;
    private String name;
    private String avatar;
    private LocalDate birthday;
    private String address;
    private String bio;
}
