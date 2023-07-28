package com.example.springapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {
    @Id
    private Long id;
    private String title;
    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;
    @Column
    private String location;
    @Column
    private Integer salary;
    @Column
    private String requirements;
    @Column
    private String jobType;
    
    @ManyToOne
    private EmployerDTO employer;
   
} 