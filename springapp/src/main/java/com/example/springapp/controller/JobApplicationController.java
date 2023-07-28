package com.example.springapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.springapp.model.JobApplicationRequest;
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
import com.example.springapp.model.JobApplication;
import com.example.springapp.model.JobApplicationDTO;
import com.example.springapp.repository.JobApplicationRepository;
import com.example.springapp.repository.JobRepository;
import com.example.springapp.repository.JobSeekerRepository;
import java.util.Optional;
import com.example.springapp.model.Job;

import com.example.springapp.model.JobSeeker;


@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {
    @Autowired
    private  JobApplicationRepository jobApplicationRepository;
    @Autowired
    private  JobRepository jobRepository;
    @Autowired
    private  JobSeekerRepository jobSeekerRepository;
    @PostMapping("/apply")
    public ResponseEntity<String> applyForJob(@RequestBody JobApplicationRequest request) {
        Optional<JobSeeker> optionalJobSeeker = jobSeekerRepository.findById(request.getJobSeekerId());
        Optional<Job> optionalJob = jobRepository.findById(request.getJobId());
    
        if (optionalJobSeeker.isPresent() && optionalJob.isPresent()) {
            JobSeeker jobSeeker = optionalJobSeeker.get();
            Job job = optionalJob.get();
    
            if (!jobSeeker.getDeleted() && !job.getDeleted()) {
                boolean hasApplied = jobApplicationRepository.existsByJobSeekerAndJob(jobSeeker, job);
    
                if (!hasApplied) {
                    JobApplication jobApplication = new JobApplication();
                    jobApplication.setJobSeeker(jobSeeker);
                    jobApplication.setJob(job);
                   
                    jobApplication.setFirstName(request.getFirstName());
                    jobApplication.setMiddleName(request.getMiddleName());
                    jobApplication.setLastName(request.getLastName());
                    jobApplication.setEmail(request.getEmail());
                    jobApplication.setGender(request.getGender());
                    jobApplication.setPhone(request.getPhone());
                    jobApplication.setCoverLetter(request.getCoverLetter());
                    jobApplication.setDate(request.getDate());
                    jobApplication.setMonth(request.getMonth());
                    jobApplication.setYear(request.getYear());
                    jobApplication.setStreet(request.getStreet());
                    jobApplication.setCity(request.getCity());
                    jobApplication.setState(request.getState());
                    jobApplication.setPostalCode(request.getPostalCode());
    
                    jobApplicationRepository.save(jobApplication);
    
                    return ResponseEntity.ok("Job application submitted successfully.");
                } else {
                    return ResponseEntity.badRequest().body("Job application already exists for this job seeker and job.");
                }
            }
        } else {
            return ResponseEntity.badRequest().body("Failed to apply for the job.");
        }
    
        return ResponseEntity.badRequest().body("Failed to apply for the job.");
    }
    
    @DeleteMapping("withdrawapplication/{jobId}/{jobSeekerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteJobApplication(@PathVariable("jobId") Long jobId, @PathVariable("jobSeekerId") Long jobSeekerId) {
     
        Optional<JobApplication> optionalJobApplication = jobApplicationRepository.findByJobIdAndJobSeekerId(jobId, jobSeekerId);
        if (optionalJobApplication.isPresent()) {
            JobApplication jobApplication = optionalJobApplication.get();
            jobApplicationRepository.delete(jobApplication);
        } 
    }
}