package com.example.springapp.controller;

import com.example.springapp.model.Employers;
import com.example.springapp.model.JobSeeker;
import com.example.springapp.model.Role;
import com.example.springapp.model.User;
import com.example.springapp.model.Users;
import com.example.springapp.repository.EmployersRepository;
import com.example.springapp.repository.JobSeekerRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.repository.UsersRepository;
import com.example.springapp.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import javax.validation.Valid;

import org.mockito.internal.matchers.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Validated
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private UserService userService;
 @Autowired
private JobSeekerRepository jobSeekerRepository;

@Autowired
private EmployersRepository employerRepository;

 
    @PostMapping("/signup/jobseeker")
    public ResponseEntity<Users> signUpJobSeeker(@Valid @RequestBody Users user) {
        Users users = userService.createUser(user, Role.JOB_SEEKER);
        return new ResponseEntity<>(users, HttpStatus.CREATED);
    }

    @PostMapping("/signup/employer")
    public ResponseEntity<Users> signUpEmployer(@Valid @RequestBody Users user) {
        final Users users = userService.createUser(user, Role.EMPLOYER);
        return new ResponseEntity<>(users, HttpStatus.CREATED);
    }

@PostMapping("/signin")
public ResponseEntity<Users> signInUser(@RequestBody Users user) {
    Users authenticatedUser = userService.authenticateUser(user);

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
    boolean emailExists = usersRepository.existsByEmail(email);
    return emailExists;
}

   


}