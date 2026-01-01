package com.example.backend;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.Repo.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://frontend-alb-127162849.us-east-1.elb.amazonaws.com"})
@RestController
public class AuthController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @GetMapping("/auth/test")
    public String test(){
        System.out.println("tedsdadsa");
        return "test";
    }

    @PostMapping("/auth/register")
    public void register(@RequestBody AuthRequest request) {
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        
        if (userRepository.containsUser(request.getUsername())) {
            throw new RuntimeException("User already exists");
        }

        String id = GenerateId.generate(20);
        while (userRepository.containsId(id)) {
            id = GenerateId.generate(20);
        }

        userRepository.save(id, request.getUsername(), hashedPassword);
        System.out.println("Saved new user. (" + id + ", " + request.getUsername() + ", " + hashedPassword + ")");
    }

    @PostMapping("/auth/login")
    public AuthResponse login(@RequestBody AuthRequest request) {

        String storedHash = userRepository.getPassword(request.getUsername());

        if (!passwordEncoder.matches(request.getPassword(), storedHash)) {
            throw new RuntimeException("Invalid password");
        }

        String userId = userRepository.getId(request.getUsername());
        String token = jwtService.generateToken(request.getUsername(), userId);
        AuthResponse response = new AuthResponse(token,userId,request.getUsername());
        System.out.println(request.getUsername() + " logged in successfully.");
        return response;

    }

    @GetMapping("/healthCheck")
    public String healthCheck() {
        return "OK";
    }

}
