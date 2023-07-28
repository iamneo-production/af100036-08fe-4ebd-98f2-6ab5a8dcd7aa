package com.example.springapp.controller;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.web.multipart.MultipartFile;
import org.hibernate.Filter;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Sort;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import com.example.springapp.model.*;
import com.example.springapp.repository.*;



@RestController
@RequestMapping("/job-search")
public class JobSearchController {
@Autowired 
    private JobRepository jobRepository;
@Autowired
    private EntityManager entityManager;
    @GetMapping("/jobs/search")
public List<Job> searchJobs(@RequestParam(value = "title", required = false) String title,
  @RequestParam(value = "location", required = false) String location) {
              if(title == null) 
              {
              return jobRepository.findByLocation(location);
              }
              else if(location == null) 
              {       
              return jobRepository.findByTitle(title);
              }
        
              else   {        
    return jobRepository.findByTitleAndLocation(title, location);
              }
}
@GetMapping("/jobs/sort")
public ResponseEntity<List<Job>> sortJobs(@RequestParam("sortBy") String sortBy) {
  List<Job> sortedJobs;
  
  if (sortBy.equals("salary")) {
    sortedJobs = jobRepository.findAll(Sort.by(Sort.Direction.DESC, "salary"));
  } else if (sortBy.equals("live")) {
    sortedJobs = jobRepository.findAll(Sort.by(Sort.Direction.ASC, "deleted"));
  } else {
    return ResponseEntity.badRequest().build();
  }
  
  return ResponseEntity.ok(sortedJobs);
}
@GetMapping("/jobs/chart")
public  ResponseEntity<List<Job>> getAllJobsevendeleted() {
    try {
     
        List<Job> job = jobRepository.findAll();
        return ResponseEntity.ok(job);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
@GetMapping("/job/deleted")
public List<Job> getAllDeletedJob() {
    Session session = entityManager.unwrap(Session.class);
    session.enableFilter("deletedFilter").setParameter("isDeleted", true);
    return jobRepository.findAll();
}
@PostMapping("/jobs/report/{id}")
    public ResponseEntity<String> reportJob(@PathVariable Long id ) {
    
        Optional<Job> optionalJob = jobRepository.findById(id);
        
        if (optionalJob.isPresent()) {
            Job job = optionalJob.get();
            
           
            job.setReported(true);
          
            jobRepository.save(job);
            
            return ResponseEntity.ok("Job reported successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
