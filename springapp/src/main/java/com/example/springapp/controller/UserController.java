<<<<<<< HEAD
package com.example.springapp.controller;
=======
package main.java.com.example.springapp.controller;
>>>>>>> 0f5fb4ad52ce7cf4b02b7c7c72814fc4bdfcac15

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.springapp.model.User;
import com.example.springapp.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private UserService userService; 

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        user.setRole("ADMIN");

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

<<<<<<< HEAD
}
=======
}
>>>>>>> 0f5fb4ad52ce7cf4b02b7c7c72814fc4bdfcac15
