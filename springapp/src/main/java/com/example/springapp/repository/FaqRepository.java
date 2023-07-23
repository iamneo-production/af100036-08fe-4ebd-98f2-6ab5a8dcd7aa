package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long> {
}