package com.example.springapp.controller;

import com.examly.springapp.model.Employers;
import com.examly.springapp.model.JobSeeker;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.EmployersRepository;
import com.examly.springapp.repository.JobSeekerRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.UserService;

import javax.validation.Valid;

import org.mockito.internal.matchers.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
@Validated
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
 @Autowired
private JobSeekerRepository jobSeekerRepository;

@Autowired
private EmployersRepository employerRepository;
 
    @PostMapping("/signup/jobseeker")
    public ResponseEntity<User> signUpJobSeeker(@Valid @RequestBody User user) {
        User users = userService.createUser(user, Role.JOB_SEEKER);
        return new ResponseEntity<>(users, HttpStatus.CREATED);
    }

    @PostMapping("/signup/employer")
    public ResponseEntity<User> signUpEmployer(@Valid @RequestBody User user) {
        final User users = userService.createUser(user, Role.EMPLOYER);
        return new ResponseEntity<>(users, HttpStatus.CREATED);
    }

@PostMapping("/signin")
public ResponseEntity<User> signInUser(@RequestBody User user) {
    User authenticatedUser = userService.authenticateUser(user);

    if (authenticatedUser != null) {
        JobSeeker jobseeker = jobSeekerRepository.findByUser(authenticatedUser);
        Employers employer = employerRepository.findByUser(authenticatedUser);

        if (employer != null) {
            authenticatedUser.setEmployerid(employer.getId());
        } 
        if (jobseeker != null) {
            authenticatedUser.setJobseekerid(jobseeker.getId());
        }

        return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(authenticatedUser,HttpStatus.UNAUTHORIZED);
    }
}



@GetMapping("/check-email/{email}")
public Boolean checkEmailExists(@PathVariable String email) {
    boolean emailExists = userRepository.existsByEmail(email);
    return emailExists;
}

   


}