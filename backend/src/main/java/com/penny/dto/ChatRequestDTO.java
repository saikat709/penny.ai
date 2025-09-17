package com.penny.dto;


import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequestDTO {
    @Nullable
    Long userId;

    @NotBlank
    String prompt;

    @NotNull
    Long conversationId;
}
