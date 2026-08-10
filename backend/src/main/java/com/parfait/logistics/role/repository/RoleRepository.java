package com.parfait.logistics.role.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parfait.logistics.role.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
