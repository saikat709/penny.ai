//package com.penny.config;
//
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.stereotype.Component;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//
//import java.util.List;
//
//@Component
//public class CorsConfig implements CorsConfigurationSource {
//
//    @Override
//    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of(
//                "http://localhost:5173",   // React dev server (Vite default)
//                "http://localhost:3000"    // React dev server (CRA default)));
//        ));
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//        config.setAllowedHeaders(List.of("*"));
//        return config;
//    }
//
//}