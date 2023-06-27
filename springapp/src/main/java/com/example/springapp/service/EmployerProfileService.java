package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.EmployerProfileModel;
import com.example.springapp.repository.EmployerProfileRepository;


@Service
public class EmployerProfileService {
    private EmployerProfileRepository employerprofileRepository;

    @Autowired
    public EmployerprofileService(EmployerProfileRepository employerprofileRepository) {
        this.employerprofileRepository = employerprofileRepository;
    }

    public EmployerProfileModel getUserById(Long id) {
        return employerprofileRepository.findById(id).orElse(null);
    }

    public EmployerProfileModel updateUser(Long id, EmployerProfileModel user2) {
        EmployerProfileModel user = employerprofileRepository.findById(id).orElse(null);
        if (user != null) {
            user2.setId(id);
            return employerprofileRepository.save(user2);
        }
        return null;
    }

}
