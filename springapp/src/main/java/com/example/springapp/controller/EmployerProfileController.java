package com.example.springapp.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.EmployerProfileModel;
import com.example.springapp.service.EmployerProfileService;

@CrossOrigin(origins = "https://8081-dfafedbbfdeabadfadacaeaebfceaeaadbdbabf.project.examly.io/")
@RestController
@RequestMapping("/employer")
public class EmployerProfileController {


    private final EmployerProfileService employerprofileService;

    public EmployerProfileController(EmployerProfileService employerprofileService) {
        this.employerprofileService = employerprofileService;
    }


    @GetMapping("/{id}")
    public ResponseEntity<EmployerProfileModel> getUser(@PathVariable Long id) {
        EmployerProfileModel user = EmployerProfileService.getEmployerProfileControllerById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
     @PutMapping("/{id}")
        public ResponseEntity<EmployerProfileModel> updateUser(@PathVariable Long id, @RequestBody EmployerProfileModel user) {
            EmployerProfileModel updatedUser = userService.updateUser(id, user);
            if (updatedUser != null) {
                return ResponseEntity.ok(updatedUser);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
}
    
