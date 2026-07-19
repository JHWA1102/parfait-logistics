package com.parfait.logistics.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignUpResponse {
	
    private Long id;

    private String email;

    private String name;
}
