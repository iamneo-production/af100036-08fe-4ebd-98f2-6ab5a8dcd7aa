package com.example.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



import javax.persistence.*;



@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;


    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    
    @Column(name = "role")
    private String role;

   
 
    @Column(name = "deleted")
    private Boolean deleted;
    @Column(name="employer_id")
    private Long employerid;

     @Column(name="jobseeker_id")
     private Long jobseekerid;

}
 