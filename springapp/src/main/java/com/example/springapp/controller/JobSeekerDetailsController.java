package com.example.springapp.controller;

import org.hibernate.Filter;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springapp.model.JobSeeker;
import com.example.springapp.repository.JobSeekerRepository;
import com.example.springapp.model.Users;
import com.example.springapp.repository.UsersRepository;
import com.example.springapp.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/jobseekersdetails")
@CrossOrigin(origins = "https://8081-becfabfadacaeaebfcaccdadddfabcfbf.project.examly.io")
public class JobSeekerDetailsController {
    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private EntityManager entityManager;

 

    @GetMapping("/job-seekers/{id}")
    public ResponseEntity<JobSeeker> getJobSeekerById(@PathVariable(value = "id") Long jobSeekerId)
            throws ResourceNotFoundException {
        Session session = entityManager.unwrap(Session.class);
        session.enableFilter("deletedFilter").setParameter("isDeleted", false);
        JobSeeker jobSeeker = jobSeekerRepository.findById(jobSeekerId)
                .orElseThrow(() -> new ResourceNotFoundException("Job seeker not found for this id :: " + jobSeekerId));
        return ResponseEntity.ok().body(jobSeeker);
    }

    @DeleteMapping("/job-seekers/{id}")
    public ResponseEntity<?> deleteJobSeekerById(@PathVariable(value = "id") Long jobSeekerId)
            throws ResourceNotFoundException {
        JobSeeker jobSeeker = jobSeekerRepository.findById(jobSeekerId)
                .orElseThrow(() -> new ResourceNotFoundException("Job seeker not found for this id :: " + jobSeekerId));
<<<<<<< HEAD:springapp/src/main/java/com/example/springapp/controller/JobSeekerDetailsController.java
        Users user = jobSeeker.getUser();
        if (user != null) {
            jobSeeker.setUser(null);
            jobSeekerRepository.save(jobSeeker);
            userRepository.delete(user);
        }
        jobSeeker.setDeleted(true);
=======
      Users user = jobSeeker.getUser();
                if (user != null) {
        jobSeeker.setUser(null);
       jobSeekerRepository.save(jobSeeker); 
   userRepository.delete(user); 
    }
        jobSeeker.setDeleted(true); 
>>>>>>> d81eca4ffd7bcd5469cbeebb86de34bf505a7f71:springapp/src/main/java/com/example/springapp/controller/JobseekerdetailsController.java
        jobSeekerRepository.save(jobSeeker);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/job-seekers/{id}")
    public ResponseEntity<JobSeeker> updateJobSeeker(@PathVariable(value = "id") Long jobSeekerId,
            @RequestBody JobSeeker updatedJobSeeker) throws ResourceNotFoundException {
        JobSeeker jobSeeker = jobSeekerRepository.findById(jobSeekerId)
                .orElseThrow(() -> new ResourceNotFoundException("Job seeker not found for this id :: " + jobSeekerId));
        BeanUtils.copyProperties(updatedJobSeeker, jobSeeker, "id");
        final JobSeeker updatedJobSeekerEntity = jobSeekerRepository.save(jobSeeker);
        return ResponseEntity.ok(updatedJobSeekerEntity);
    }
}
