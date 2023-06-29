package com.example.springapp.controller;

import com.example.springapp.model.Employers;
import com.example.springapp.service.EmployerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ="https://8081-dfafedbbfdeabadfadacaeaebfceaeaadbdbabf.project.examly.io/")
")
@RestController
@RequestMapping("/employers")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @GetMapping
    public ResponseEntity<Iterable<Employer>> getAllEmployers() {
        return new ResponseEntity<>(employerService.getAllEmployers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employer> getEmployerById(@PathVariable Long id) {
        return new ResponseEntity<>(employerService.getEmployerById(id), HttpStatus.OK);
    }

  

   
}
