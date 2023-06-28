package com.examly.springapp.controller;
import org.hibernate.Filter;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.JobSeeker;
import com.example.springapp.repository.JobSeekerRepository;
import com.example.springapp.model.Task;
import com.example.springapp.repository.TaskRepository;
public class JobseekerdetailsController {
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
      User user = jobSeeker.getUser();
                if (user != null) {
        jobSeeker.setUser(null);
       jobSeekerRepository.save(jobSeeker); 
   userRepository.delete(user); 
    }
        jobSeeker.setDeleted(true); 
        jobSeekerRepository.save(jobSeeker);
    
        return ResponseEntity.ok().build();
 
}

    
    
    @PutMapping("/job-seekers/{id}")
    public ResponseEntity<JobSeeker> updateJobSeeker(@PathVariable(value = "id") Long jobSeekerId, @RequestBody JobSeeker updatedJobSeeker)
            throws ResourceNotFoundException {
        JobSeeker jobSeeker = jobSeekerRepository.findById(jobSeekerId)
                .orElseThrow(() -> new ResourceNotFoundException("Job seeker not found for this id :: " + jobSeekerId));
    
        BeanUtils.copyProperties(updatedJobSeeker, jobSeeker, "id");
    
        final JobSeeker updatedJobSeekerEntity = jobSeekerRepository.save(jobSeeker);
        return ResponseEntity.ok(updatedJobSeekerEntity);
 
}
    
}
