package com.parfait.logistics.common.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

	// User
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
	USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),
	INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다."),
	
	SIGNUP_NOT_ALLOWED(HttpStatus.FORBIDDEN, "회원가입이 허용되지 않은 이메일입니다."),
	
	// Company
	COMPANY_NOT_FOUND(HttpStatus.NOT_FOUND, "회사를 찾을 수 없습니다."),
	
	// Warehouse
	WAREHOUSE_NOT_FOUND(HttpStatus.NOT_FOUND, "창고를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String message;
}