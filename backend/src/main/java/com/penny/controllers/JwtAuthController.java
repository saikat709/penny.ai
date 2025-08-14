package com.penny.controllers;

import com.penny.dto.RegisterRequestDTO;
import com.penny.services.UserService;
import com.penny.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class JwtAuthController {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public JwtAuthController(JwtUtil jwtUtil, AuthenticationManager authenticationManager, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser( @Valid @RequestBody RegisterRequestDTO registerRequestDTO){
        try {
            userService.registerUser(registerRequestDTO);
            return ResponseEntity.ok(Map.of("message", "success"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestParam String username, @RequestParam String password){

        Map<String, String> map = new HashMap<>();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            map.put("accessToken", jwtUtil.generateAccessToken(username));
            map.put("refreshToken", jwtUtil.generateRefreshToken(username));
        } catch (AuthenticationException e) {
            map.put("error", e.getMessage());
        }

        return map;
    }

    @PostMapping("/logout")
    public Map<String, String> logout(){
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        return response;
    }

    @PostMapping("/refresh")
    public String refresh(){
        return "Refreshed";
    }
}
