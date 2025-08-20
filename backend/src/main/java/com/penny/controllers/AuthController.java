package com.penny.controllers;

import com.penny.dto.GoogleLoginDTO;
import com.penny.dto.RefreshAccessTokenRequestDTO;
import com.penny.dto.RegisterRequestDTO;
import com.penny.dto.UserResponseDto;
import com.penny.repositories.UserRepository;
import com.penny.services.UserService;
import com.penny.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    private final UserRepository userRepository;

    public AuthController(JwtUtil jwtUtil, AuthenticationManager authenticationManager, UserService userService, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser( @Valid @RequestBody RegisterRequestDTO registerRequestDTO){
        userService.registerUser(registerRequestDTO);
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@Valid @RequestBody GoogleLoginDTO googleBody){
        UserResponseDto dto = userService.googleLogin(googleBody);

        return ResponseEntity.ok(Map.of(
                "accessToken", jwtUtil.generateAccessToken(dto.getEmail()),
                "refreshToken", jwtUtil.generateRefreshToken(dto.getEmail()),
                "user", dto,
                "success", true
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RegisterRequestDTO body){
        String email = body.getEmail();
        String password = body.getPassword();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            if (!authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials", "success", false));
            }

            return userRepository.findByEmail(email)
                    .map(user -> ResponseEntity.ok(Map.of(
                            "accessToken", jwtUtil.generateAccessToken(email),
                            "refreshToken", jwtUtil.generateRefreshToken(email),
                            "user", new UserResponseDto(user.getId(), user.getName(), user.getEmail()),
                            "success", true
                    )))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not found", "success", false)));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage(), "success", false));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshAccessTokenRequestDTO req){

        jwtUtil.printTokenInfo(req.getRefreshToken());

        if ( !jwtUtil.validateJwtToken(req.getRefreshToken()) ) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid or expired refresh token");
        }

        String username = jwtUtil.getUsernameFromToken(req.getRefreshToken());
        String newAccessToken = jwtUtil.generateAccessToken(username);

        return ResponseEntity.ok(Map.of(
                "accessToken", newAccessToken,
                "refreshToken", req.getRefreshToken()
        ));
    }
}
