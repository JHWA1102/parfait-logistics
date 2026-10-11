package com.parfait.logistics.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateProductRequest {

    @NotBlank(message = "품목 코드는 필수입니다.")
    @Size(max = 30, message = "품목 코드는 30자 이하여야 합니다.")
    private String code;

    @NotBlank(message = "품목명은 필수입니다.")
    @Size(max = 100, message = "품목명은 100자 이하여야 합니다.")
    private String name;

    @NotBlank(message = "단위는 필수입니다.")
    @Size(max = 20, message = "단위는 20자 이하여야 합니다.")
    private String unit;
}
