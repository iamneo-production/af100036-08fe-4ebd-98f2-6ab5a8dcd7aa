package com.example.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Column;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.time.LocalDateTime;

import java.util.List;


@Entity
@Table(name = "job_seeker")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FilterDef(name = "deletedFilter", parameters = @ParamDef(name = "isDeleted", type = "boolean"))
@Filter(name = "deletedFilter", condition = "deleted = :isDeleted")
public class JobSeeker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ElementCollection
    @CollectionTable(name = "job_seeker_skills", joinColumns = @JoinColumn(name = "job_seeker_id"))
    @Column(name = "skill")
    private List<String> skills;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "location")
    private String location;

    @Column(name = "marital_status")
    private String maritalStatus;

    @Column(name = "hometown")
    private String hometown;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "last_job_designation")
    private String lastJobDesignation;

    @Column(name = "reasons_for_leaving")
    private String reasonsForLeaving;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private Users user;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted", nullable = false, updatable = true)
    private Boolean deleted = false;

    @Column(name = "reported", nullable = false, updatable = true)
    private Boolean reported = false;

    @JsonIgnoreProperties("jobSeeker")
    @OneToMany(mappedBy = "jobSeeker", cascade = CascadeType.ALL)
    private List<JobApplication> applications;

       @Column(name = "mobile")
    private String mobile;
        @Column(name = "lastjob")
    private String lastjob;

}