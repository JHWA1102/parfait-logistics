package com.parfait.logistics.warehouse.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.parfait.logistics.auth.security.CustomUserDetails;
import com.parfait.logistics.warehouse.dto.CreateWarehouseRequest;
import com.parfait.logistics.warehouse.dto.UpdateWarehouseRequest;
import com.parfait.logistics.warehouse.dto.WarehouseResponse;
import com.parfait.logistics.warehouse.service.WarehouseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/warehouses")
@RequiredArgsConstructor
@Validated
public class WarehouseController {

    private final WarehouseService warehouseService;

    @PostMapping
    public WarehouseResponse createWarehouse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CreateWarehouseRequest request) {

        return warehouseService.createWarehouse(
                userDetails.getUserId(),
                request
        );
    }
    
    @PutMapping("/{warehouseId}")
    public WarehouseResponse updateWarehouse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("warehouseId") Long warehouseId,
            @Valid @RequestBody UpdateWarehouseRequest request) {

        return warehouseService.updateWarehouse(
                userDetails.getUserId(),
                warehouseId,
                request);
    }
    
    @DeleteMapping("/{warehouseId}")
    public ResponseEntity<Void> deleteWarehouse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("warehouseId") Long warehouseId) {

        warehouseService.deleteWarehouse(
                userDetails.getUserId(),
                warehouseId);

        return ResponseEntity.noContent().build();
    }
}