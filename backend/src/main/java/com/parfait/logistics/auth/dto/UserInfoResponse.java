package com.parfait.logistics.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfoResponse {

    private Long id;
    private String email;
    private String name;
    private String role;
}
