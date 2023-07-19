package com.example.springapp.repository;

<<<<<<< HEAD
import com.example.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    
        
    }
=======
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {


}
>>>>>>> a6a0470e3de50c52c07aeeda9f3cc0855eda5faf
