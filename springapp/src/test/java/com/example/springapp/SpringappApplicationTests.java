package com.example.springapp;

import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.example.springapp.model.Employer;
import com.example.springapp.model.JobSeekers;
import com.example.springapp.model.Jobs;
import com.example.springapp.model.JobsApplied;
import com.example.springapp.model.User;
import com.example.springapp.service.EmployerService;
import com.example.springapp.service.JobSeekersService;
import com.example.springapp.service.JobsService;
import com.example.springapp.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RunWith(SpringJUnit4ClassRunner.class) 
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {

	 @Autowired
	    private MockMvc mockMvc;
	 
	 @Autowired
	 private UserService userService;
	 
	 @Autowired
	 private JobsService jobsService;
	 
	 @Autowired
	 private JobSeekersService jsService;
	 
	 @Autowired
	 private EmployerService empService;
	 
	 Employer emp1= new Employer(1L,"ABC","IT industry","Chennai","August 1","abc@gmail.com","MALE",2L);

     Jobs j1= new Jobs(1L,"Junior Developer","IT company","1 years+","Chennai",emp1);
     
     JobSeekers js1 =new JobSeekers(1L,"Deepika","Java, Angular","1 year","Chennai",3L);
 
     private String asJsonString(Object object) throws JsonProcessingException {
	        ObjectMapper objectMapper = new ObjectMapper();                                   
	        return objectMapper.writeValueAsString(object);
	    }
     
     
     @Test
	    public void testCreateEmployee() throws Exception {
	    
	        mockMvc.perform(MockMvcRequestBuilders.post("/employer")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(asJsonString(emp1)))
	                .andExpect(MockMvcResultMatchers.status().isCreated());

	    }
     
     @Test
     public void testGetEmployeeAll() throws Exception {
     	
         mockMvc.perform(get("/employer"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     
     @Test
     public void testGetEmployeeById() throws Exception {
     	
         mockMvc.perform(get("/employer").param("id", "1"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     
     @Test
	    public void testCreateJob() throws Exception {
	    
	        mockMvc.perform(MockMvcRequestBuilders.post("/jobs")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(asJsonString(emp1)))
	                .andExpect(MockMvcResultMatchers.status().isCreated());

	    }
     
     
     @Test
     public void testGetJobsAll() throws Exception {
     	
         mockMvc.perform(get("/jobs"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     
     @Test
     public void testGetJobsById() throws Exception {
     	
         mockMvc.perform(get("/jobs").param("id", "1"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }

     
     @Test
     public void testGetJobSeekersAll() throws Exception {
     	
         mockMvc.perform(get("/job-seekers"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     
     @Test
     public void testGetJobSeekersById() throws Exception {
     	
         mockMvc.perform(get("/job-seekers").param("id", "1"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     
     @Test
     public void test_case1() {
     String directoryPath = "src/main/java/com/example/springapp/controller";
      File directory = new File(directoryPath);
      assertTrue(directory.exists() && directory.isDirectory());;
      }


     @Test
     public void test_case2() {
     String filePath = "src/main/java/com/example/springapp/controller/JobsController.java";
      File file = new File(filePath);
      assertTrue(file.exists() && file.isFile());;
      }
    
}
