package com.parfait.logistics.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parfait.logistics.user.entity.SignupPermission;

public interface SignupPermissionRepository extends JpaRepository<SignupPermission, Long> {
	Optional<SignupPermission> findByEmailAndUsedFalse(String email);
}
