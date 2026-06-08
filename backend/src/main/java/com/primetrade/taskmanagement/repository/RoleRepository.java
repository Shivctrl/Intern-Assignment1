package com.primetrade.taskmanagement.repository;

import com.primetrade.taskmanagement.model.ERole;
import com.primetrade.taskmanagement.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
