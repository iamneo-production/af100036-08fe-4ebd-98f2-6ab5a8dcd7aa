package com.example.springapp.controller;
<<<<<<< HEAD

import com.example.springapp.model.Employers;
import com.example.springapp.service.EmployerService;

=======
import com.example.springapp.model.Employer;
import com.example.springapp.service.EmployerService;
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD
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
=======
import java.util.List;

@RestController
@RequestMapping("/employer")
public class EmployerController {

    private final EmployerService employerService;

    @Autowired
    public EmployerController(EmployerService employerService) {
        this.employerService = employerService;
    }

    @PostMapping
    public ResponseEntity<Employer> createEmployer(@RequestBody Employer employer) {
        Employer createdEmployer = employerService.createEmployer(employer);
        if (createdEmployer != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployer);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    
    

    @GetMapping
    public ResponseEntity<List<Employer>> getEmployerAll() {
        List<Employer> employers = employerService.getAllEmployers();
        return new ResponseEntity<>(employers, HttpStatus.OK);
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employer> getEmployerById(@PathVariable Long id) {
<<<<<<< HEAD
        return new ResponseEntity<>(employerService.getEmployerById(id), HttpStatus.OK);
    }

  

   
=======
        Employer employer = employerService.getEmployerById(id);
        if (employer != null) {
            return ResponseEntity.ok(employer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1
}
