package com.parfait.logistics.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parfait.logistics.company.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
