package com.penny.services;

import com.penny.dto.RegisterRequestDTO;
import com.penny.models.UserEntity;
import com.penny.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(RegisterRequestDTO registerRequestDTO){
        UserEntity user = new UserEntity();
        user.setEmail(registerRequestDTO.getEmail());
        // If username is not provided in DTO, default to email prefix or email itself
        /**
        String email = registerRequestDTO.getEmail();
        if (email != null && email.contains("@")) {
            user.setUsername(email.substring(0, email.indexOf('@')));
        } else {
            user.setUsername(email);
        }
         */
        user.setPasswordHash(passwordEncoder.encode(registerRequestDTO.getPassword()));
        userRepository.save(user);
    }
}