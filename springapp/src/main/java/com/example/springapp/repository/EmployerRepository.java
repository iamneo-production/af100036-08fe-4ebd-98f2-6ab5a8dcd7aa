package com.example.springapp.repository;

<<<<<<< HEAD
import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springapp.model.Employers;
import com.example.springapp.model.User;

public interface  EmployerRepository extends JpaRepository<Employer, Integer> {

    Optional<Employer> findById(Long id);
    @Query("SELECT e FROM Employers e")
    @Filter(name = "deletedFilter", condition = "deleted = :deleted")
    List<Employer> findAll(@Param("deleted") boolean deleted);
    Employer getEmployerByUser(User authenticatedUser);


  

    
=======
import com.example.springapp.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1
}
