package com.example.springapp.controller;

import com.example.springapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springapp.model.*;
import com.example.springapp.repository.*;
import java.util.Optional;


@RestController
@RequestMapping("/job-details")
public class JobDetailscontroller {
    @Autowired
    private JobRepository jobRepository;

    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable(value = "id") Long jobId)
            throws ResourceNotFoundException {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found for this id :: " + jobId));
        return ResponseEntity.ok().body(job);
    } 
}