package com.penny.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.*;
import org.springframework.http.HttpMethod;

import java.io.IOException;

@Configuration
public class SecurityConfig {

    LoggingFilter loggingFilter;

    public SecurityConfig(LoggingFilter loggingFilter) {
        this.loggingFilter = loggingFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)

            .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
            .addFilterBefore(new LoginFilter(), UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // allow preflight CORS requests
                    .requestMatchers(
                            // non-api... dont need
                            "/", "/test", "/number", "/login", "/api/login/",

                            // Swagger & OpenAPI endpoints
                            "/swagger-ui.html",  "/swagger-ui/**",
                            "/v3/api-docs",      "/v3/api-docs/**",
                            "/v3/api-docs.yaml", "/webjars/**",

                            // h2
                            "/h2-console", "/h2-console/**",

                            // Main - Endpoints we are concerned with
                            "/api/auth/*",
                            "/api/chat/*",
                            "/chat/*"
                    ).permitAll()
                    .anyRequest().authenticated()
            )
            .formLogin(form -> form
                    .successHandler(myAuthenticationSuccessHandler()) // Custom success handler
                    .permitAll()
            )
             .logout(LogoutConfigurer::permitAll);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
            throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
        SimpleUrlAuthenticationSuccessHandler handler = new SimpleUrlAuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                String next = request.getParameter("next");
                if ( next == null || next.isEmpty() ) {
                    super.onAuthenticationSuccess(request, response, authentication);
                } else {
                    response.sendRedirect(next);
                }
            }
        };
        handler.setDefaultTargetUrl("/secured");
        handler.setAlwaysUseDefaultTargetUrl(false);
        return handler;
    }

    @Bean
    public AuthenticationFailureHandler myAuthenticationFailureHandler() {
        return new SimpleUrlAuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                System.out.println(request.getRequestURI());
                super.onAuthenticationFailure(request, response, exception);
            }
        };
    }
}
