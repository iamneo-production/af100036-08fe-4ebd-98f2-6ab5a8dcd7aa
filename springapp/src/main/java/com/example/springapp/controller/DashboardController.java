package com.example.springapp.controller;

import com.example.springapp.exception.ResourceNotFoundException;
import com.example.springapp.model.Job;
import com.example.springapp.model.JobApplication;
import com.example.springapp.model.JobApplicationDTO;
import com.example.springapp.model.JobSeeker;
import com.example.springapp.model.Employers;
import com.example.springapp.repository.JobRepository;
import com.example.springapp.repository.EmployersRepository;
import com.example.springapp.repository.JobApplicationRepository;
import com.example.springapp.repository.JobSeekerRepository;
import com.example.springapp.repository.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployersRepository employerRepository;
      @Autowired
    private  JobApplicationRepository jobApplicationRepository;
    @Autowired
    private JobSeekerRepository jobSeekerRepository;
    @Autowired
    private UsersRepository userRepository;
@Autowired
private EntityManager entityManager;
 
 

   
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJobById(@PathVariable(value = "id") Long jobId)
            throws ResourceNotFoundException {
         
               Job job= jobRepository.findById(jobId)
               .orElseThrow(() -> new ResourceNotFoundException("Job not found for this id :: " + jobId));
                job.setDeleted(true); 
                jobRepository.save(job);
                        
                return ResponseEntity.ok().build();
    }




   
    @GetMapping("/employers/{id}/jobs")
public List<Job> getJobsByEmployerId(@PathVariable(value = "id") Long employerId)
        throws ResourceNotFoundException {
    Employers employer = employerRepository.findById(employerId)
    
            .orElseThrow(() -> new ResourceNotFoundException("Employer not found for this id :: " + employerId));

    List<Job> jobs = employer.getJobs();
   
    return jobs;
}

    @PostMapping("/job-seekers/report/{id}")
public ResponseEntity<String> reportJobSeeker(@PathVariable Long id) {
    Optional<JobSeeker> optionalJobSeeker = jobSeekerRepository.findById(id);

    if (optionalJobSeeker.isPresent()) {
        JobSeeker jobSeeker = optionalJobSeeker.get();

        jobSeeker.setReported(true);
        jobSeekerRepository.save(jobSeeker);

        return ResponseEntity.ok("Job seeker reported successfully");
    } else {
        return ResponseEntity.notFound().build();
    }
}






private JobApplicationDTO convertToDTO(JobApplication jobApplication) {
    JobApplicationDTO jobApplicationDTO = new JobApplicationDTO();
    jobApplicationDTO.setId(jobApplication.getId());
    jobApplicationDTO.setFirstName(jobApplication.getFirstName());
    jobApplicationDTO.setMiddleName(jobApplication.getMiddleName());
    jobApplicationDTO.setLastName(jobApplication.getLastName());
    jobApplicationDTO.setEmail(jobApplication.getEmail());
    jobApplicationDTO.setGender(jobApplication.getGender());
    jobApplicationDTO.setPhone(jobApplication.getPhone());
    jobApplicationDTO.setCoverLetter(jobApplication.getCoverLetter());
    jobApplicationDTO.setDate(jobApplication.getDate());
    jobApplicationDTO.setMonth(jobApplication.getMonth());
    jobApplicationDTO.setYear(jobApplication.getYear());
    jobApplicationDTO.setStreet(jobApplication.getStreet());
    jobApplicationDTO.setCity(jobApplication.getCity());
    jobApplicationDTO.setState(jobApplication.getState());
    jobApplicationDTO.setPostalCode(jobApplication.getPostalCode());
    jobApplicationDTO.setJobSeekerid(jobApplication.getJobSeeker() != null ? jobApplication.getJobSeeker().getId() : 0);
    jobApplicationDTO.setSelected(jobApplication.getSelected());
    return jobApplicationDTO;
}

@GetMapping("/jobApplications/{jobId}")
public ResponseEntity<?> getJobApplicationsByJobId(@PathVariable Long jobId) {
    List<JobApplication> jobApplications = jobApplicationRepository.findByJobId(jobId);

    if (!jobApplications.isEmpty()) {
        List<JobApplicationDTO> jobApplicationDTOs = new ArrayList<>();
        for (JobApplication jobApplication : jobApplications) {
            JobApplicationDTO jobApplicationDTO = convertToDTO(jobApplication);
            jobApplicationDTOs.add(jobApplicationDTO);
        }
        return ResponseEntity.ok(jobApplicationDTOs);
    } else {
        return ResponseEntity.notFound().build();
    }

}


 @PostMapping("/selectApplicant")
    public ResponseEntity<String> selectApplicant(@RequestBody Long applicationId) {
      
        Optional<JobApplication> optionalJobApplication = jobApplicationRepository.findById(applicationId);

        if (optionalJobApplication.isPresent()) {
      
            JobApplication jobApplication = optionalJobApplication.get();
            jobApplication.setSelected(true);
            jobApplicationRepository.save(jobApplication);

            return ResponseEntity.ok("Applicant selected successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
@GetMapping("/jobApplications/JobSeeker/{jobSeekerId}/appliedJobs")
public ResponseEntity<List<Job>> getAppliedJobsByJobSeekerId(@PathVariable Long jobSeekerId) {
    try {
        Optional<JobSeeker> optionalJobSeeker = jobSeekerRepository.findById(jobSeekerId);
        if (optionalJobSeeker.isPresent()) {
            JobSeeker jobSeeker = optionalJobSeeker.get();

            List<Job> appliedJobs = jobSeeker.getApplications().stream()
                    .map(JobApplication::getJob)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(appliedJobs);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

}