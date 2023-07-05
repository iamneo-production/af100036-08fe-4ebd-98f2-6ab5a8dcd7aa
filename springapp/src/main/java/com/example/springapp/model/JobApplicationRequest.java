package  com.example.springapp.model;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
@Entity
@Table(name = "JobApplicationRequest")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "job_seeker_id")
    private Long jobSeekerId;
    
    @Column(name = "job_id")
    private Long jobId;
    
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

   
}