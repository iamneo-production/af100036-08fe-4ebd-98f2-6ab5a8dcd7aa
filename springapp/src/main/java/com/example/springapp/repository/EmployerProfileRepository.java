package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.EmployerProfileModel;

public interface EmployerProfileRepository extends JpaRepository<EmployerProfileModel, Long> {

  

}



