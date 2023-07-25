package com.example.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.util.*;


@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Name is required")
    @Column(name = "name")
    private String name;

    @NotEmpty(message = "Email is required")
    @Column(name = "email", unique = true)
    private String email;

    @NotEmpty(message = "Password is required")
    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "deleted")
    private Boolean deleted;

    @Column(name = "employer_id")
    private Long employerid;

    @Column(name = "jobseeker_id")
    private Long jobseekerid;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<Role> roles;
  

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Users)) return false;
        Users users = (Users) o;
        return Objects.equals(id, users.id) &&
                Objects.equals(name, users.name) &&
                Objects.equals(email, users.email) &&
                Objects.equals(password, users.password) &&
                role == users.role &&
                Objects.equals(deleted, users.deleted) &&
                Objects.equals(employerid, users.employerid) &&
                Objects.equals(jobseekerid, users.jobseekerid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, password, role, deleted, employerid, jobseekerid);
    }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", deleted=" + deleted +
                ", employerid=" + employerid +
                ", jobseekerid=" + jobseekerid +
                '}';
    }
}
