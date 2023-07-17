package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Employers;
import com.examly.springapp.model.JobSeeker;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.EmployersRepository;
import com.examly.springapp.repository.JobSeekerRepository;
import com.examly.springapp.repository.UserRepository;


@Configuration
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployersRepository employerRepository;

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
   
    


    public User createUser(User user, Role role) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(role);

        User savedUser = userRepository.save(user);

        if (role == Role.EMPLOYER) {
            Employers employer = new Employers();
            employer.setName(user.getName());
            employer.setUser(savedUser);
            employerRepository.save(employer);
        } 
        if (role == Role.JOB_SEEKER) {
            JobSeeker jobSeeker = new JobSeeker();
            jobSeeker.setName(user.getName());
            jobSeeker.setUser(savedUser);
            jobSeekerRepository.save(jobSeeker);
        }

        return savedUser;
    }

    public User authenticateUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return existingUser;
        } else {
            return null;
        }
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}