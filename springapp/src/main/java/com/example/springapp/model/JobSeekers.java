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
public class JobSeekers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String skills;

    @Column
    private String experience;

    @Column
    private String location;

    @Column
    private Long userId;

    @OneToMany(mappedBy = "jobSeekers")
    private List<JobsApplied> jobsApplied;

    public JobSeekers(Long id, String name, String skills, String experience, String location, Long userId) {
        this.id = id;
        this.name = name;
        this.skills = skills;
        this.experience = experience;
        this.location = location;
        this.userId = userId;
    }
}
