package com.penny.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private int jwtExpirationMs;
    private SecretKey key;


    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username, TokenType tokenType) {
        Date expiryTime = new Date();
        if ( tokenType == TokenType.REFRESH ){
            expiryTime = new Date((new Date()).getTime() + jwtExpirationMs);
        } else {
            expiryTime = new Date(expiryTime.getTime() + jwtExpirationMs * 2L);
        }
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expiryTime)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


    public String generateAccessToken(String username){
        return generateToken(username, TokenType.ACCESS);
    }

    public String generateRefreshToken(String username){
        return generateToken(username, TokenType.REFRESH);
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e ){
            System.out.println(e.getMessage());
        }
        return false;
    }


    public void printTokenInfo(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key) // Your secret key
                .build()
                .parseClaimsJws(token)
                .getBody();

        String username = claims.getSubject(); // Usually stored in 'sub'
        Date issuedAt = claims.getIssuedAt();  // 'iat'
        Date expiration = claims.getExpiration(); // 'exp'

        System.out.println("Username: " + username);
        System.out.println("Issued At: " + issuedAt);
        System.out.println("Expiration: " + expiration);
    }


    public enum TokenType {
        REFRESH,
        ACCESS
    }
}

/**
 *catch (SecurityException e) {
 *             System.out.println("Invalid JWT signature: " + e.getMessage());
 *         } catch (MalformedJwtException e) {
 *             System.out.println("Invalid JWT token: " + e.getMessage());
 *         } catch (ExpiredJwtException e) {
 *             System.out.println("JWT token is expired: " + e.getMessage());
 *         } catch (UnsupportedJwtException e) {
 *             System.out.println("JWT token is unsupported: " + e.getMessage());
 *         } catch (IllegalArgumentException e) {
 *             System.out.println("JWT claims string is empty: " + e.getMessage());
 *         }
 */