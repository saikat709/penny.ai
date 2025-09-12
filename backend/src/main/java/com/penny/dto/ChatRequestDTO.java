package com.penny.dto;


import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequestDTO {
    @Nullable
    Integer user_id;

    @NotBlank
    String prompt;
}
