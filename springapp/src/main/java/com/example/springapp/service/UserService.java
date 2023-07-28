package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Employers;
import com.example.springapp.model.JobSeeker;
import com.example.springapp.model.Role;
import com.example.springapp.model.User;
import com.example.springapp.model.Users;
import com.example.springapp.repository.EmployersRepository;
import com.example.springapp.repository.JobSeekerRepository;
import com.example.springapp.repository.UserRepository;
import java.util.*;
import com.example.springapp.repository.UsersRepository;
@Configuration
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private EmployersRepository employerRepository;

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
   
  

    @Autowired
    public UserService(UsersRepository userRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

   
    


    public Users createUser(Users user, Role role) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(role);

        Users savedUser = usersRepository.save(user);

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

    public Users authenticateUser(Users user) {
        Users existingUser = usersRepository.findByEmail(user.getEmail());

        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return existingUser;
        } else {
            return null;
        }
    }

    public Users createDefaultAdminUser() {
        
        String defaultAdminEmail = "admin@example.com";
        String defaultAdminPassword = "adminPassword";

        Users existingUser = usersRepository.findByEmail(defaultAdminEmail);
        if (existingUser == null) {
            Users adminUser = new Users();
            adminUser.setName("admin"); 
            adminUser.setEmail(defaultAdminEmail);
            adminUser.setPassword(passwordEncoder.encode(defaultAdminPassword));
            adminUser.setRole(Role.ADMIN);
            Set<Role> roles = new HashSet<>();
            roles.add(Role.ADMIN);
            roles.add(Role.EMPLOYER);
            roles.add(Role.JOB_SEEKER);
            adminUser.setRoles(roles);

            usersRepository.save(adminUser);

       
            JobSeeker adminJobSeeker = new JobSeeker();
            adminJobSeeker.setName("admin");
            adminJobSeeker.setUser(adminUser);
            jobSeekerRepository.save(adminJobSeeker);

            Employers adminEmployer = new Employers();
            adminEmployer.setName("admin");
            adminEmployer.setUser(adminUser);
            
            employerRepository.save(adminEmployer);
            jobSeekerRepository.save(adminJobSeeker);
            employerRepository.save(adminEmployer);

            return adminUser;
        }

        return existingUser;
    }

}