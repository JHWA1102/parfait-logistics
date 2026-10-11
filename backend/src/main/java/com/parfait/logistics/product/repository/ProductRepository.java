package com.parfait.logistics.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parfait.logistics.company.entity.Company;
import com.parfait.logistics.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByCompanyOrderByCodeAsc(Company company);

    Optional<Product> findByIdAndCompany(Long id, Company company);

    boolean existsByCompanyAndCode(Company company, String code);
}
