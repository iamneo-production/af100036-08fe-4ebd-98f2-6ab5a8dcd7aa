package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Job;

import com.example.springapp.model.JobSeeker;
import com.example.springapp.model.JobApplication;
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    boolean existsByJobSeekerAndJob(JobSeeker jobSeeker, Job job);

    
    boolean existsByJob(Job job);

   
    List<JobApplication> findByJobSeekerId(Long jobSeekerId);
    Optional<JobApplication> findByJobIdAndJobSeekerId(Long jobId, Long jobSeekerId);


    List<JobApplication> findByJobId(Long jobId);
    
  

}