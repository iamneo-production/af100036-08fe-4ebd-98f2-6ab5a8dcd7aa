package com.example.springapp.service;

import com.example.springapp.model.Jobs;
import com.example.springapp.repository.JobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobsService {
    private final JobsRepository jobsRepository;

    @Autowired
    public JobsService(JobsRepository jobsRepository) {
        this.jobsRepository = jobsRepository;
    }

    public List<Jobs> getAllJobs() {
        return jobsRepository.findAll();
    }

    public Jobs createJob(Jobs job) {
        return jobsRepository.save(job);
    }

    public Jobs getJobById(Long id) {
        return jobsRepository.findById(id).orElse(null);
    }


<<<<<<< HEAD
}
=======
}
>>>>>>> 0f5fb4ad52ce7cf4b02b7c7c72814fc4bdfcac15
