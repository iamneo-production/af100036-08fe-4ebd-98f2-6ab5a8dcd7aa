package com.example.springapp.service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.springapp.model.Employer;
import com.example.springapp.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmployerService {

    private final EmployerRepository employerRepository;

    @Autowired
    public EmployerService(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    public Employer getEmployerById(Long id) {
        return employerRepository.findById(id).orElse(null);
    }

    public Employer createEmployer(Employer employer) {
        return employerRepository.save(employer);
    }
    
    public Employer updateEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    public void deleteEmployerById(Long id) {
        employerRepository.deleteById(id);
    }
}