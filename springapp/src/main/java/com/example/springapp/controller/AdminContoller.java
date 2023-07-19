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
import com.example.springapp.exception.*;
import com.example.springapp.model.*;
import com.example.springapp.repository.*;



@CrossOrigin(origins = "https://8081-becfabfadacaeaebfcaccdadddfabcfbf.project.examly.io")
@RestController
@RequestMapping("/admins")
public class AdminContoller {
   
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployersRepository employerRepository;
      @Autowired
    private  JobApplicationRepository jobApplicationRepository;
    @Autowired
    private JobSeekerRepository jobSeekerRepository;
    @Autowired
    private UserRepository userRepository;
   

    @Autowired 
    private TaskRepository taskRepository;
@Autowired
private EntityManager entityManager;
   @Autowired
   private  CmsRepository cmsRepository;
  

@PostMapping("/jobs")
public ResponseEntity<Job> addJob(@RequestBody Job newJob) {
    Long employerId = newJob.getEmployer().getId();
    Employers existingEmployer = employerRepository.findById(employerId).orElse(null);

    if (existingEmployer != null) {
        newJob.setEmployer(existingEmployer);
        final Job addedJob = jobRepository.save(newJob);
        return ResponseEntity.ok(addedJob);
    } else {
        return ResponseEntity.notFound().build();
    }
}
}