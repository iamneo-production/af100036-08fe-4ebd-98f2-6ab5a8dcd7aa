package com.example.springapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerDTO {
    @Id
    private Long id;
    private String name;
   @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;
    private String location;
}