<<<<<<< HEAD
 package com.example.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



import javax.persistence.*;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;



@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
=======
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
>>>>>>> a6a0470e3de50c52c07aeeda9f3cc0855eda5faf
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
}
>>>>>>> a6a0470e3de50c52c07aeeda9f3cc0855eda5faf
