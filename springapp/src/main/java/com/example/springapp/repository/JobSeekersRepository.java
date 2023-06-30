package com.example.springapp.repository;

import com.example.springapp.model.JobSeekers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSeekersRepository extends JpaRepository<JobSeekers, Long> {
}
