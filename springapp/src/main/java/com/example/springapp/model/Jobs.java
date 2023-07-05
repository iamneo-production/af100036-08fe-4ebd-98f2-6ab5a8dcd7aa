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
public class Jobs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String requirements;

    @Column
    private String location;

    @ManyToOne
    private Employer employer;

    @OneToMany(mappedBy = "jobs")
    private List<JobsApplied> jobsApplied;

  

    public Jobs(Long id, String title, String description, String requirements, String location, Employer employer) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.location = location;
        this.employer = employer;
    }

    
}
