package com.example.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.*;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "Job")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FilterDef(name = "deletedFilter", parameters = @ParamDef(name = "isDeleted", type = "boolean"))
@Filter(name = "deletedFilter", condition = "deleted = :isDeleted")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "Location")
    private String location;

    @Column(name = "Salary")
      private Integer salary;


    @Column(name = "Requirements")
    private String requirements;

    @Column(name = "JobType")
    private String jobType;


@JsonIgnoreProperties("job")
    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employers employer;


 @JsonIgnoreProperties("job")
    @OneToMany(mappedBy = "job", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<JobApplication> jobApplications;



    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted", nullable = false, updatable = true)
    private Boolean deleted = false;

    @Column(name = "Reported", nullable = false, updatable = true)
    private Boolean reported = false;


}