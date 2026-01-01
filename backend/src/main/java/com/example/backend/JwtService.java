package com.example.backend;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final Key key =
        Keys.hmacShaKeyFor("kGvSdMfg5zKyAbedcDlb7JmniZV8hwC3zFtKyG4pTjXlkstbRhQd00IM0cuJulLW".getBytes());

    public String generateToken(String username, String userId) {
        return Jwts.builder()
            .setSubject(username)
            .claim("userId",userId)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(key)
            .compact();
    }

    public String validateAndExtract(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("userId",String.class);
    }
    
}
