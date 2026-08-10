package com.parfait.logistics.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.parfait.logistics.common.exception.BusinessException;
import com.parfait.logistics.common.exception.ErrorCode;
import com.parfait.logistics.company.entity.Company;
import com.parfait.logistics.company.repository.CompanyRepository;
import com.parfait.logistics.user.dto.SignUpRequest;
import com.parfait.logistics.user.dto.SignUpResponse;
import com.parfait.logistics.user.entity.SignupPermission;
import com.parfait.logistics.user.entity.User;
import com.parfait.logistics.user.repository.SignupPermissionRepository;
import com.parfait.logistics.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final SignupPermissionRepository signupPermissionRepository;
    
    @Transactional
    public SignUpResponse signUp(SignUpRequest request) {

        // 이미 가입한 이메일인지 확인
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException(ErrorCode.USER_ALREADY_EXISTS);
        }

        // 회원가입이 허용된 이메일인지 확인
        SignupPermission permission =
                signupPermissionRepository
                        .findByEmailAndUsedFalse(request.getEmail())
                        .orElseThrow(() ->
                                new BusinessException(ErrorCode.SIGNUP_NOT_ALLOWED)
                        );

        // 초대된 회사 조회
        Company company = companyRepository.findById(permission.getCompanyId())
                .orElseThrow(() ->
                        new BusinessException(ErrorCode.COMPANY_NOT_FOUND)
                );

        // 사용자 생성
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(permission.getRole())
                .company(company)
                .build();

        User savedUser = userRepository.save(user);

        // 초대 권한 사용 처리
        permission.use();

        return SignUpResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .name(savedUser.getName())
                .build();
    }
}
