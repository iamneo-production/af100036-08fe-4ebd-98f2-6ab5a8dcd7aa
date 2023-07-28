package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminUserInitilatization  implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) {
        userService.createDefaultAdminUser();
    }
    
}
