package com.parfait.logistics.warehouse.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parfait.logistics.company.entity.Company;
import com.parfait.logistics.warehouse.entity.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
	List<Warehouse> findAllByCompany(Company company);

	Optional<Warehouse> findByIdAndCompany(Long id, Company company);
}
