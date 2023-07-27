package com.example.springapp.repository;


import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springapp.model.Job;


public interface JobRepository extends JpaRepository<Job, Long>,JpaSpecificationExecutor<Job> {

    @Query("SELECT e FROM Job e")
    @Filter(name = "deletedFilter", condition = "deleted = :deleted")
    List<Job> findAll(@Param("deleted") boolean deleted);
    List<Job> findByLocation(String location);
    List<Job> findByTitle(String title);
    List<Job> findByTitleAndLocation(String title, String location);
    Iterable<Job> searchByTitleAndLocationAndJobTypeAndSalary(Object object, Object object2, Object object3, int i);
    List<Job> findByReported(boolean b);
  
  

  

   
    }
