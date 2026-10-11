package com.parfait.logistics.product.dto;

import com.parfait.logistics.product.entity.Product;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductResponse {

    private Long id;
    private String code;
    private String name;
    private String unit;
    private Boolean active;

    public static ProductResponse from(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .code(product.getCode())
                .name(product.getName())
                .unit(product.getUnit())
                .active(product.getActive())
                .build();
    }
}
