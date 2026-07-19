package com.parfait.logistics.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.parfait.logistics.auth.dto.LoginRequest;
import com.parfait.logistics.auth.dto.LoginResponse;
import com.parfait.logistics.auth.jwt.JwtProvider;
import com.parfait.logistics.common.exception.BusinessException;
import com.parfait.logistics.common.exception.ErrorCode;
import com.parfait.logistics.user.entity.User;
import com.parfait.logistics.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException(ErrorCode.INVALID_PASSWORD);
        }

        String token = jwtProvider.createToken(user.getEmail());

        return LoginResponse.builder()
                .accessToken(token)
                .build();
    }

}