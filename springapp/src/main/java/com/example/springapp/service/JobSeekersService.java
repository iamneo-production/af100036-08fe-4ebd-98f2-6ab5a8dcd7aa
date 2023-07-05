package com.example.springapp.service;

import com.example.springapp.model.JobSeekers;
import com.example.springapp.repository.JobSeekersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobSeekersService {

    private JobSeekersRepository jobSeekersRepository;

    @Autowired
    public JobSeekersService(JobSeekersRepository jobSeekersRepository) {
        this.jobSeekersRepository = jobSeekersRepository;
    }

    public List<JobSeekers> getAllJobSeekers() {
        return jobSeekersRepository.findAll();
    }

    public JobSeekers getJobSeekersById(Long id) {
        return jobSeekersRepository.findById(id).orElse(null);
    }

    public JobSeekers createJobSeeker(JobSeekers jobSeeker) {
        return jobSeekersRepository.save(jobSeeker);
    }

    public JobSeekers updateJobSeeker(JobSeekers jobSeeker) {
        return jobSeekersRepository.save(jobSeeker);
    }

    public void deleteJobSeeker(Long id) {
        jobSeekersRepository.deleteById(id);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 0f5fb4ad52ce7cf4b02b7c7c72814fc4bdfcac15
