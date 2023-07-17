package com.example.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.util.Objects;



@Entity
@Table(name = "users")
@Data
@EntityListeners(AuditingEntityListener.class)
public class User {

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

    public String getName() {
        return name;
    }

    @Column(name = "deleted")
    private Boolean deleted;
    
    @Column(name="employer_id")
    private Long employerid;

     @Column(name="jobseeker_id")
     private Long jobseekerid;


    public User() {
    }

    public User(Long id, String name, String email, String password, Role role, Boolean deleted, Long employerid, Long jobseekerid) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.deleted = deleted;
        this.employerid = employerid;
        this.jobseekerid = jobseekerid;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean isDeleted() {
        return this.deleted;
    }

    public Boolean getDeleted() {
        return this.deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Long getEmployerid() {
        return this.employerid;
    }

    public void setEmployerid(Long employerid) {
        this.employerid = employerid;
    }

    public Long getJobseekerid() {
        return this.jobseekerid;
    }

    public void setJobseekerid(Long jobseekerid) {
        this.jobseekerid = jobseekerid;
    }

    public User id(Long id) {
        setId(id);
        return this;
    }

    public User name(String name) {
        setName(name);
        return this;
    }

    public User email(String email) {
        setEmail(email);
        return this;
    }

    public User password(String password) {
        setPassword(password);
        return this;
    }

    public User role(Role role) {
        setRole(role);
        return this;
    }

    public User deleted(Boolean deleted) {
        setDeleted(deleted);
        return this;
    }

    public User employerid(Long employerid) {
        setEmployerid(employerid);
        return this;
    }

    public User jobseekerid(Long jobseekerid) {
        setJobseekerid(jobseekerid);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(role, user.role) && Objects.equals(deleted, user.deleted) && Objects.equals(employerid, user.employerid) && Objects.equals(jobseekerid, user.jobseekerid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, password, role, deleted, employerid, jobseekerid);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", role='" + getRole() + "'" +
            ", deleted='" + isDeleted() + "'" +
            ", employerid='" + getEmployerid() + "'" +
            ", jobseekerid='" + getJobseekerid() + "'" +
            "}";
    }
     

}
