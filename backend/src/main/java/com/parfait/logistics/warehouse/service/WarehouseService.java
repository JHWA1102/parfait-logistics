package com.parfait.logistics.warehouse.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.parfait.logistics.common.exception.BusinessException;
import com.parfait.logistics.common.exception.ErrorCode;
import com.parfait.logistics.company.entity.Company;
import com.parfait.logistics.user.entity.User;
import com.parfait.logistics.user.repository.UserRepository;
import com.parfait.logistics.warehouse.dto.CreateWarehouseRequest;
import com.parfait.logistics.warehouse.dto.UpdateWarehouseRequest;
import com.parfait.logistics.warehouse.dto.WarehouseResponse;
import com.parfait.logistics.warehouse.entity.Warehouse;
import com.parfait.logistics.warehouse.repository.WarehouseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final UserRepository userRepository;

    public WarehouseResponse createWarehouse(Long userId, CreateWarehouseRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        Company company = user.getCompany();

        Warehouse warehouse = Warehouse.builder()
                .company(company)
                .code(request.getCode())
                .name(request.getName())
                .address(request.getAddress())
                .manager(request.getManager())
                .active(true)
                .build();

        warehouseRepository.save(warehouse);

        return WarehouseResponse.from(warehouse);
    }
    
    @Transactional(readOnly = true)
    public List<WarehouseResponse> getWarehouses(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        Company company = user.getCompany();

        return warehouseRepository.findAllByCompany(company)
                .stream()
                .map(WarehouseResponse::from)
                .toList();
    }
    
    @Transactional
    public WarehouseResponse updateWarehouse(
            Long userId,
            Long warehouseId,
            UpdateWarehouseRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        Warehouse warehouse = warehouseRepository.findByIdAndCompany(
                        warehouseId,
                        user.getCompany())
                .orElseThrow(() -> new BusinessException(ErrorCode.WAREHOUSE_NOT_FOUND));

        warehouse.update(
                request.getName(),
                request.getAddress(),
                request.getManager(),
                request.getActive());

        return WarehouseResponse.from(warehouse);
    }
    
    @Transactional
    public void deleteWarehouse(Long userId, Long warehouseId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        Warehouse warehouse = warehouseRepository
                .findByIdAndCompany(warehouseId, user.getCompany())
                .orElseThrow(() -> new BusinessException(ErrorCode.WAREHOUSE_NOT_FOUND));

        warehouseRepository.delete(warehouse);
    }
}