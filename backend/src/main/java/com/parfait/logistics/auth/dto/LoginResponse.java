package com.parfait.logistics.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
	
	private String accessToken;

}
