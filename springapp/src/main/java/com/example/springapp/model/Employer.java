package com.example.springapp.model;
<<<<<<< HEAD
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.time.LocalDateTime;

import java.util.List;
@Entity
@Table(name = "employers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@FilterDef(name = "deletedFilter", parameters = @ParamDef(name = "isDeleted", type = "boolean"))
@Filter(name = "deletedFilter", condition = "deleted = :isDeleted")
public class Employer {

=======

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employer {
>>>>>>> a6a0470e3de50c52c07aeeda9f3cc0855eda5faf
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

<<<<<<< HEAD
    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "location")
    private String location;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    private User user;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted", nullable = false, updatable = true)
    private Boolean deleted = false;

    @OneToMany(mappedBy = "employer", cascade ={ CascadeType.REMOVE, CascadeType.ALL,CascadeType.PERSIST})
    @JsonIgnoreProperties("employer")
    private List<Job> jobs;
}
 
=======
    @Column
    private String name;

    @Column
    private String description;

    @Column
    private String location;

    @Column
    private Long userId;

    @OneToMany(mappedBy = "employer")
    private List<Jobs> jobs;


    public Employer(Long id, String name, String description, String location, Long userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.userId = userId;
    }

  
}
>>>>>>> a6a0470e3de50c52c07aeeda9f3cc0855eda5faf
