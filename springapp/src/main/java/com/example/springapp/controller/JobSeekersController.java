package com.example.springapp.controller;
import com.example.springapp.model.JobSeekers;
import com.example.springapp.service.JobSeekersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.springapp.model.JobSeekers;
import com.example.springapp.service.JobSeekersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/job-seekers")
public class JobSeekersController {

    private final JobSeekersService jobSeekersService;

    @Autowired
    public JobSeekersController(JobSeekersService jobSeekersService) {
        this.jobSeekersService = jobSeekersService;
    }

    @PostMapping
    public ResponseEntity<JobSeekers> createJobSeeker(@RequestBody JobSeekers jobSeekers) {
        JobSeekers createdJobSeekers = jobSeekersService.createJobSeeker(jobSeekers);
        return new ResponseEntity<>(createdJobSeekers, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<JobSeekers>> getJobSeekersAll() {
        List<JobSeekers> jobSeekersList = jobSeekersService.getAllJobSeekers();
        return new ResponseEntity<>(jobSeekersList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobSeekers> getJobSeekersById(@PathVariable Long id) {
        JobSeekers jobSeekers = jobSeekersService.getJobSeekersById(id);
        if (jobSeekers != null) {
            return new ResponseEntity<>(jobSeekers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
}
