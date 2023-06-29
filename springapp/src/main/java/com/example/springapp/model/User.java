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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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
 