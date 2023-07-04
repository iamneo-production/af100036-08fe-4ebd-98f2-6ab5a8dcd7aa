package com.example.springapp.model;

import lombok.AllArgsConstructor;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import lombok.Data;
import javax.persistence.Table;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firstName;

    @Column
    private String middleName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private String gender;

    @Column
    private Long phone;

    @Column
    private String coverLetter;

    @Column
    private Integer date;

    @Column
    private Integer month;

    @Column
    private Long year;

    @Column
    private String street;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private Long postalCode;

    @Column
    private Long jobSeekerid;

  
}