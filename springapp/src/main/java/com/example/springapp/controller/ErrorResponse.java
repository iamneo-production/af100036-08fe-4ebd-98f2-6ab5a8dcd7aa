package com.example.springapp.controller;

import java.util.List;

public class ErrorResponse {
    private String message;
    private List<String> errors;

    // Constructors, getters, and setters

    public ErrorResponse(String message, List<String> errors) {
        this.message = message;
        this.errors = errors;
    }

    // Getters and setters
}
