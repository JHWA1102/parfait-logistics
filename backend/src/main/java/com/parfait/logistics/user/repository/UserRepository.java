package com.parfait.logistics.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.parfait.logistics.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
    Optional<User> findByEmail(String email);

    @EntityGraph(attributePaths = "role")
    Optional<User> findWithRoleByEmail(String email);

    boolean existsByEmail(String email);
}
