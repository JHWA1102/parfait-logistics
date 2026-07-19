package com.parfait.logistics.warehouse.dto;

import com.parfait.logistics.warehouse.entity.Warehouse;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WarehouseResponse {

    private Long id;
    private String code;
    private String name;
    private String address;
    private String manager;
    private Boolean active;

    public static WarehouseResponse from(Warehouse warehouse) {

        return WarehouseResponse.builder()
                .id(warehouse.getId())
                .code(warehouse.getCode())
                .name(warehouse.getName())
                .address(warehouse.getAddress())
                .manager(warehouse.getManager())
                .active(warehouse.getActive())
                .build();
    }
}