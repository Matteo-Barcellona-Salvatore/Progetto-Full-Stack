package org.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    private final List<LoginRequest> loginAttempts = new ArrayList<>();

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        loginAttempts.add(request);

        if ("admin".equals(request.getUsername()) && "1234".equals(request.getPassword())) {
            return ResponseEntity.ok("Login effettuato con successo!");
        } else {
            return ResponseEntity.status(401).body("Credenziali errate.");
        }
    }

    @GetMapping("/login/info")
    public List<LoginRequest> getAllLoginAttempts() {
        return loginAttempts;
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {
        }

        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }
}
