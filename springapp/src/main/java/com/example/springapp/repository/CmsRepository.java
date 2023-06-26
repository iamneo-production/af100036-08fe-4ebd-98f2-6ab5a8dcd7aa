package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Cms;

public interface CmsRepository extends JpaRepository<Cms, Long> {
}
