package com.parfait.logistics.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.parfait.logistics.common.exception.BusinessException;
import com.parfait.logistics.common.exception.ErrorCode;
import com.parfait.logistics.company.entity.Company;
import com.parfait.logistics.company.repository.CompanyRepository;
import com.parfait.logistics.user.dto.SignUpRequest;
import com.parfait.logistics.user.dto.SignUpResponse;
import com.parfait.logistics.user.entity.User;
import com.parfait.logistics.user.entity.UserRole;
import com.parfait.logistics.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    
    public SignUpResponse signUp(SignUpRequest request) {
    	
    	if(userRepository.existsByEmail(request.getEmail())) {
    		throw new BusinessException(ErrorCode.USER_ALREADY_EXISTS);
        }
    	
    	Company company = companyRepository.findById(request.getCompanyId())
    	        .orElseThrow(() -> new BusinessException(ErrorCode.COMPANY_NOT_FOUND));

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(UserRole.ADMIN)
                .company(company)
                .build();

        User savedUser = userRepository.save(user);

        return SignUpResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .name(savedUser.getName())
                .build();
    }
}
