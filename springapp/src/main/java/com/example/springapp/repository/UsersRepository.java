package com.example.springapp.repository;

import com.example.springapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersRepository extends JpaRepository<Users, Long> {
    
    
    Users findByEmail(String email);

    boolean existsByEmail(String email);
        
    }
