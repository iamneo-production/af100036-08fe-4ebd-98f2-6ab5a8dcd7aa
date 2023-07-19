package com.example.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springapp.model.Employers;
import com.example.springapp.model.Users;

public interface  EmployersRepository extends JpaRepository<Employers, Integer> {

    Optional<Employers> findById(Long id);
    @Query("SELECT e FROM Employer e")
    @Filter(name = "deletedFilter", condition = "deleted = :deleted")
    List<Employers> findAll(@Param("deleted") boolean deleted);
    Employers getEmployerByUser(Users authenticatedUser);
    Employers findByUser(Users authenticatedUser);
}
