package com.example.springapp.model;

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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private String location;

    @column
    private String email;

    @column
    private String gender;

    @Column
    private Long userId;

    @OneToMany(mappedBy = "employer")
    private List<Jobs> jobs;


    public Employer(Long id, String name, String description, String location, Long userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.email=email;
        this.gender=gender;
        this.userId = userId;
        
    }

  
}