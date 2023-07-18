package com.example.springapp.controller;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springapp.exception.ResourceNotFoundException;
import com.example.springapp.model.Employers;
import com.example.springapp.repository.EmployersRepository;
import javax.persistence.EntityManager;

@CrossOrigin(origins = "https://8081-becfabfadacaeaebfcaccdadddfabcfbf.project.examly.io")
@RestController
@RequestMapping("/employerdetails")
public class EmployersController {

    @Autowired
    private EmployersRepository employerRepository;

    @Autowired
    private EntityManager entityManager;

    @GetMapping("/{id}")
    public ResponseEntity<Employers> getEmployerById(@PathVariable(value = "id") Long employerId)
            throws ResourceNotFoundException {
        Session session = entityManager.unwrap(Session.class);
        session.enableFilter("deletedFilter").setParameter("isDeleted", false);
        Employers employer = employerRepository.findById(employerId)
                .orElseThrow(() -> new ResourceNotFoundException("Employer not found for this id :: " + employerId));
        return ResponseEntity.ok().body(employer);
    }
    

    @PutMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<Employers> updateEmployer(@PathVariable(value = "id") Long employerId,
                                                    @RequestBody Employers updatedEmployer)
            throws ResourceNotFoundException {
        Employers employer = employerRepository.findById(employerId)
                .orElseThrow(() -> new ResourceNotFoundException("Employer not found for this id :: " + employerId));

        BeanUtils.copyProperties(updatedEmployer, employer, "id");

        final Employers updatedEmployerEntity = employerRepository.save(employer);
        return ResponseEntity.ok(updatedEmployerEntity);
    }
}
