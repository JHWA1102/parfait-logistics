package com.parfait.logistics.user.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parfait.logistics.user.dto.SignUpRequest;
import com.parfait.logistics.user.dto.SignUpResponse;
import com.parfait.logistics.user.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public SignUpResponse signUp(@RequestBody SignUpRequest request) {
        return userService.signUp(request);
    }
    
    @GetMapping("/me")
    public String me() {
        return "로그인 성공!";
    }
}