package com.penny.services;

import com.penny.dto.RegisterRequestDTO;
import com.penny.models.UserEntity;
import com.penny.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(RegisterRequestDTO registerRequestDTO){
        UserEntity user = new UserEntity();
        user.setEmail(registerRequestDTO.getEmail());
        user.setPassword(registerRequestDTO.getPassword());
        user.setGoogleId(registerRequestDTO.getGoogleId());
        userRepository.save(user);
    }
}
