package com.example.springapp.service;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.springapp.model.Employers;

import com.example.springapp.repository.EmployerRepository;


@Service
public class EmployerService {
 
    @Autowired
    private EmployerRepository employerRepository;

    public Iterable<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }
    
    

    public Employer getEmployerById(Long id) {
        return employerRepository.findById(id).orElse(null);
    }

    public Employer saveEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

  
   
}