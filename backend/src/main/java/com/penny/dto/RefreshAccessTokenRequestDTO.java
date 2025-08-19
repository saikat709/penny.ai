package com.penny.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshAccessTokenRequestDTO {
    @NotBlank
    private String refreshToken;
}
