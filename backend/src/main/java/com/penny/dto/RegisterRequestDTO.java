package com.penny.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String googleId;
}
