package com.parfait.logistics.role;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parfait.logistics.role.entity.Role;
import com.parfait.logistics.role.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roles")
public class RoleController {
	
    private final RoleRepository roleRepository;

    @GetMapping
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }	

}
