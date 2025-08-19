package com.penny.services;

import com.penny.dto.GoogleLoginDTO;
import com.penny.dto.RegisterRequestDTO;
import com.penny.dto.UserResponseDto;
import com.penny.models.UserEntity;
import com.penny.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
        user.setPasswordHash(passwordEncoder.encode(registerRequestDTO.getPassword()));
        userRepository.save(user);
    }

    public UserResponseDto googleLogin(@Valid GoogleLoginDTO googleBody) {
        Optional<UserEntity> user = userRepository.getUserEntitiesByEmail(googleBody.getEmail());

        UserEntity userEntity;

        if (user.isPresent()) {
            userEntity = user.get();

        } else {
            UserEntity newUser = new UserEntity();
            newUser.setName(googleBody.getName());
            newUser.setEmail(googleBody.getEmail());
            String placeholder = java.util.UUID.randomUUID().toString();
            newUser.setPasswordHash(passwordEncoder.encode(placeholder));

            userRepository.save(newUser);
            userEntity = newUser;
        }
        return new UserResponseDto(
                userEntity.getId(),
                userEntity.getName(),
                userEntity.getEmail()
        );
    }
}