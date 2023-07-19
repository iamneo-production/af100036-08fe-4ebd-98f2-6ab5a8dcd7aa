package com.example.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
<<<<<<< HEAD
    @Column(name = "name")
    private String name;


    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    public String getName() {
        return name;
    }

 
    @Column(name = "deleted")
    private Boolean deleted;
    @Column(name="employer_id")
    private Long employerid;

     @Column(name="jobseeker_id")
     private Long jobseekerid;

}
 
=======

    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String role;
<<<<<<< HEAD
}
>>>>>>> a6a0470e3de50c52c07aeeda9f3cc0855eda5faf
=======
}
>>>>>>> 75850cd1a8c504fa36a8c92282678baa4f690fe1
