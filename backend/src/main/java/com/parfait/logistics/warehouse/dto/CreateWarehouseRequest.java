package com.parfait.logistics.warehouse.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateWarehouseRequest {

    @NotBlank(message = "창고 코드는 필수입니다.")
    private String code;

    @NotBlank(message = "창고명은 필수입니다.")
    private String name;

    private String address;

    private String manager;
}