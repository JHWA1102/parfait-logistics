package com.parfait.logistics.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parfait.logistics.auth.dto.LoginRequest;
import com.parfait.logistics.auth.dto.LoginResponse;
import com.parfait.logistics.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        System.out.println("🔥 LOGIN CONTROLLER 호출");
        
        return authService.login(request);
    }
}
