package com.example.springapp.model;

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
<<<<<<< HEAD

=======
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1
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
<<<<<<< HEAD
public class Employer {
=======
public class Employers {
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "location")
    private String location;

<<<<<<< HEAD
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    private User user;
=======
    @Column(name="dob")
    private String dob;

    @Column(name = "email")
    private String email;
    
    @Column(name = "gender")
    private String gender;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

<<<<<<< HEAD
=======
    
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted", nullable = false, updatable = true)
    private Boolean deleted = false;

<<<<<<< HEAD
    @OneToMany(mappedBy = "employers", cascade ={ CascadeType.REMOVE, CascadeType.ALL,CascadeType.PERSIST})
    @JsonIgnoreProperties("employers")
=======
    @OneToMany(mappedBy = "employer", cascade ={ CascadeType.REMOVE, CascadeType.ALL,CascadeType.PERSIST})
    @JsonIgnoreProperties("employer")
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1
    private List<Job> jobs;
}
