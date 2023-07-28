package com.example.springapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;
@Configuration
@ServletComponentScan
@ComponentScan
@EnableAutoConfiguration
@SpringBootApplication
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = "com.example.springapp.repository")
public class SpringappApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringappApplication.class, args);
	}

}
