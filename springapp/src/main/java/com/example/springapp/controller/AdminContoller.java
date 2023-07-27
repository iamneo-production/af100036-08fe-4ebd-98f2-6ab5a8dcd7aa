package com.example.springapp.controller;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.web.multipart.MultipartFile;
import org.hibernate.Filter;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.exception.*;

import com.example.springapp.model.*;

import com.example.springapp.repository.*;


import org.springframework.data.domain.Sort;


@RestController
@RequestMapping("/admins")
public class AdminContoller {


    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployersRepository employerRepository;
      @Autowired
    private  JobApplicationRepository jobApplicationRepository;
    @Autowired
    private JobSeekerRepository jobSeekerRepository;
    @Autowired
    private UsersRepository userRepository;
    @Autowired
    private  FaqRepository faqRepository;

    @Autowired 
    private TaskRepository taskRepository;
@Autowired
private EntityManager entityManager;
   @Autowired
   private  CmsRepository cmsRepository;
   
  
     @PostMapping("/job-seekers")
    public ResponseEntity<JobSeeker> addJobSeekers(@RequestBody JobSeeker newJobSeeker) {
      final JobSeeker addedJobSeeker = jobSeekerRepository.save(newJobSeeker);
      return ResponseEntity.ok(addedJobSeeker);
    }
    @PostMapping("/employers")
    public ResponseEntity<Employers> addEmployer(@RequestBody Employers newEmployer) {
      final Employers addedEmployer = employerRepository.save(newEmployer);
      return ResponseEntity.ok(addedEmployer);
    }
    
@GetMapping("/faq")
public List<Faq> getAllFAQs() {
  return faqRepository.findAll();
}
@PostMapping("/faq/add")
public Faq addFAQ(@RequestBody Faq faq) {
  return faqRepository.save(faq);
}
@PutMapping("/faq/{id}")
public Faq updateFAQ(@PathVariable Long id, @RequestBody Faq updatedFaq) {
  return faqRepository.findById(id)
    .map(faq -> {
      faq.setQuestion(updatedFaq.getQuestion());
      faq.setAnswer(updatedFaq.getAnswer());
  
      return faqRepository.save(faq);
    })
    .orElseThrow(() -> new ResourceNotFoundException("FAQ entry not found with id: " + id));
}
@DeleteMapping("/faq/{id}")
public ResponseEntity<?> deleteFAQ(@PathVariable Long id) {
  return faqRepository.findById(id)
    .map(faq -> {
      faqRepository.delete(faq);
      return ResponseEntity.ok().build();
    })
    .orElseThrow(() -> new ResourceNotFoundException("FAQ entry not found with id: " + id));
}

   
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

  
    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskRepository.save(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

 
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> markTaskAsCompleted(@PathVariable Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            taskRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

  
    @PostMapping("/cms/upload")
public ResponseEntity<String> uploadFile(@RequestParam("image") MultipartFile file,
                                         @RequestParam("title") String title,
                                         @RequestParam("content") String content) throws IOException {
    if (file.isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
    }

    String originalFileName = file.getOriginalFilename();
    String fileName = StringUtils.cleanPath(originalFileName);
    System.out.println("Received file: " + fileName);
    String fileExtension = getFileExtension(originalFileName);

    Cms postEntity = new Cms();
    postEntity.setFileName(fileName);
    postEntity.setFileExtension(fileExtension);
    postEntity.setImageData(file.getBytes());
    postEntity.setTitle(title);
    postEntity.setContent(content);

    postEntity = cmsRepository.save(postEntity);

    return ResponseEntity.ok("File uploaded successfully");
}

@GetMapping("/cms/posts")
public ResponseEntity<List<Cms>> getPosts() {
    List<Cms> posts = cmsRepository.findAll();
    if (!posts.isEmpty()) {
        return ResponseEntity.ok(posts);
    } else {
        return ResponseEntity.notFound().build();
    }
}

@PutMapping("/cms/posts/{postId}")
public ResponseEntity<String> updatePost(@PathVariable Long postId,
                                         @RequestParam(value = "image", required = false) MultipartFile file,
                                         @RequestParam("title") String title,
                                         @RequestParam("content") String content) throws IOException {
    Optional<Cms> postOptional = cmsRepository.findById(postId);
    if (postOptional.isPresent()) {
        Cms post = postOptional.get();

        if (file != null && !file.isEmpty()) {
            String originalFileName = file.getOriginalFilename();
            String fileName = StringUtils.cleanPath(originalFileName);
            String fileExtension = getFileExtension(originalFileName);

            post.setFileName(fileName);
            post.setFileExtension(fileExtension);
            post.setImageData(file.getBytes());
        }

        post.setTitle(title);
        post.setContent(content);

        cmsRepository.save(post);

        return ResponseEntity.ok("Post updated successfully");
    } else {
        return ResponseEntity.notFound().build();
    }
}

private String getFileExtension(String fileName) {
    int dotIndex = fileName.lastIndexOf(".");
    if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
        return fileName.substring(dotIndex + 1);
    } else {
        return "";
    }
}

    @PutMapping(value = "/employers/{id}", consumes = "application/json")
    public ResponseEntity<Employers> updateEmployer(@PathVariable(value = "id") Long employerId, @RequestBody Employers updatedEmployer)
        throws ResourceNotFoundException {
        Employers employer = employerRepository.findById(employerId)
            .orElseThrow(() -> new ResourceNotFoundException("Employer not found for this id :: " + employerId));
        
       
        BeanUtils.copyProperties(updatedEmployer, employer, "id");
        
        final Employers updatedEmployerEntity = employerRepository.save(employer);
        return ResponseEntity.ok(updatedEmployerEntity);
    }

    @GetMapping("/employers")
    public ResponseEntity<List<Employers>> getAllEmployers() {
        try{
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        filter.setParameter("isDeleted", false);
        List<Employers> employers = employerRepository.findAll();
        session.disableFilter("deletedFilter");
        return ResponseEntity.ok(employers);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/job-seekers")
    public ResponseEntity<List<JobSeeker>> getAllJobSeekers() {
        try {
            Session session = entityManager.unwrap(Session.class);
            Filter filter = session.enableFilter("deletedFilter");
            filter.setParameter("isDeleted", false);
            List<JobSeeker> jobSeekers = jobSeekerRepository.findAll();
            session.disableFilter("deletedFilter"); 
            return ResponseEntity.ok(jobSeekers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    

    @PostMapping("/jobs/report/{id}")
    public ResponseEntity<String> reportJob(@PathVariable Long id ) {
    
        Optional<Job> optionalJob = jobRepository.findById(id);
        
        if (optionalJob.isPresent()) {
            Job job = optionalJob.get();
            
           
            job.setReported(true);
          
            jobRepository.save(job);
            
            return ResponseEntity.ok("Job reported successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/jobs/{id}")
    public ResponseEntity<String> unreportJob(@PathVariable Long id) {
        Optional<Job> optionalJob = jobRepository.findById(id);
    
        if (optionalJob.isPresent()) {
            Job job = optionalJob.get();
    
            job.setReported(false);
            jobRepository.save(job);
    
            return ResponseEntity.ok("Job unreported successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/job-seekers/report/{id}")
public ResponseEntity<String> reportJobSeeker(@PathVariable Long id) {
    Optional<JobSeeker> optionalJobSeeker = jobSeekerRepository.findById(id);

    if (optionalJobSeeker.isPresent()) {
        JobSeeker jobSeeker = optionalJobSeeker.get();

        jobSeeker.setReported(true);
        jobSeekerRepository.save(jobSeeker);

        return ResponseEntity.ok("Job seeker reported successfully");
    } else {
        return ResponseEntity.notFound().build();
    }
}

@PostMapping("/job-seekers/unreport/{id}")
public ResponseEntity<String> unreportJobSeeker(@PathVariable Long id) {
    Optional<JobSeeker> optionalJobSeeker = jobSeekerRepository.findById(id);

    if (optionalJobSeeker.isPresent()) {
        JobSeeker jobSeeker = optionalJobSeeker.get();

        jobSeeker.setReported(false);
        jobSeekerRepository.save(jobSeeker);

        return ResponseEntity.ok("Job seeker unreported successfully");
    } else {
        return ResponseEntity.notFound().build();
    }
}

@GetMapping("/job/deleted")
public List<Job> getAllDeletedJob() {
    Session session = entityManager.unwrap(Session.class);
    session.enableFilter("deletedFilter").setParameter("isDeleted", true);
    return jobRepository.findAll();
}
@GetMapping("/employer/deleted")
public List<Employers> getAllDeletedEmployer() {
    Session session = entityManager.unwrap(Session.class);
    session.enableFilter("deletedFilter").setParameter("isDeleted", true);
    return employerRepository.findAll();
}

@GetMapping("/sort-by-salary")
public List<Job> sortBySalary() {

    Sort sortBySalary = Sort.by(Sort.Direction.DESC, "salary");
    return jobRepository.findAll(sortBySalary);
}

@GetMapping("/sort-by-date-posted")
public List<Job> sortByDatePosted() {
  
    Sort sortByDatePosted = Sort.by(Sort.Direction.DESC, "createdAt");
    return jobRepository.findAll(sortByDatePosted);
}


@GetMapping("/jobs/search")
public List<Job> searchJobs(@RequestParam(value = "title", required = false) String title,
  @RequestParam(value = "location", required = false) String location) {
              if(title == null) 
              {
              return jobRepository.findByLocation(location);
              }
              else if(location == null) 
              {       
              return jobRepository.findByTitle(title);
              }
        
              else   {        
    return jobRepository.findByTitleAndLocation(title, location);
              }
}
@GetMapping("/jobs/sort")
public ResponseEntity<List<Job>> sortJobs(@RequestParam("sortBy") String sortBy) {
  List<Job> sortedJobs;
  
  if (sortBy.equals("salary")) {
    sortedJobs = jobRepository.findAll(Sort.by(Sort.Direction.DESC, "salary"));
  } else if (sortBy.equals("live")) {
    sortedJobs = jobRepository.findAll(Sort.by(Sort.Direction.ASC, "deleted"));
  } else {
    return ResponseEntity.badRequest().build();
  }
  
  return ResponseEntity.ok(sortedJobs);
}
    
    @GetMapping("/reported/employers")
    public ResponseEntity<List<Job>> getReportedJobs() {
        List<Job> reportedJobs = jobRepository.findByReported(true);
        return ResponseEntity.ok(reportedJobs);
    }
    
    @GetMapping("/reported/jobseekers")
    public ResponseEntity<List<JobSeeker>> getReportedJobSeekers() {
        List<JobSeeker> reportedJobSeekers = jobSeekerRepository.findByReported(true);
        return ResponseEntity.ok(reportedJobSeekers);
    }


    @GetMapping("/job-seekers/{id}")
    public ResponseEntity<JobSeeker> getJobSeekerById(@PathVariable(value = "id") Long jobSeekerId)
            throws ResourceNotFoundException {
                Session session = entityManager.unwrap(Session.class);
                session.enableFilter("deletedFilter").setParameter("isDeleted", false);
        JobSeeker jobSeeker = jobSeekerRepository.findById(jobSeekerId)
                .orElseThrow(() -> new ResourceNotFoundException("Job seeker not found for this id :: " + jobSeekerId));
        return ResponseEntity.ok().body(jobSeeker);
    }
    @DeleteMapping("/job-seekers/{id}")
    public ResponseEntity<?> deleteJobSeekerById(@PathVariable(value = "id") Long jobSeekerId)
            throws ResourceNotFoundException {
    
        JobSeeker jobSeeker = jobSeekerRepository.findById(jobSeekerId)
                .orElseThrow(() -> new ResourceNotFoundException("Job seeker not found for this id :: " + jobSeekerId));
      Users user = jobSeeker.getUser();
                if (user != null) {
        jobSeeker.setUser(null);
       jobSeekerRepository.save(jobSeeker); 
   userRepository.delete(user); 
    }
        jobSeeker.setDeleted(true); 
        jobSeekerRepository.save(jobSeeker);
    
        return ResponseEntity.ok().build();
 
}

    
    
    @PutMapping("/job-seekers/{id}")
    public ResponseEntity<JobSeeker> updateJobSeeker(@PathVariable(value = "id") Long jobSeekerId, @RequestBody JobSeeker updatedJobSeeker)
            throws ResourceNotFoundException {
        JobSeeker jobSeeker = jobSeekerRepository.findById(jobSeekerId)
                .orElseThrow(() -> new ResourceNotFoundException("Job seeker not found for this id :: " + jobSeekerId));
    
        BeanUtils.copyProperties(updatedJobSeeker, jobSeeker, "id");
    
        final JobSeeker updatedJobSeekerEntity = jobSeekerRepository.save(jobSeeker);
        return ResponseEntity.ok(updatedJobSeekerEntity);
 
}
    
    
    @GetMapping("/job-seekers/deleted")
    public List<JobSeeker> getAllDeletedJobSeekers() {
        Session session = entityManager.unwrap(Session.class);
        session.enableFilter("deletedFilter").setParameter("isDeleted", true);
        return jobSeekerRepository.findAll();
    }
   

@PostMapping("/apply")
public ResponseEntity<String> applyForJob(@RequestBody JobApplicationRequest request) {
    Optional<JobSeeker> optionalJobSeeker = jobSeekerRepository.findById(request.getJobSeekerId());
    Optional<Job> optionalJob = jobRepository.findById(request.getJobId());

    if (optionalJobSeeker.isPresent() && optionalJob.isPresent()) {
        JobSeeker jobSeeker = optionalJobSeeker.get();
        Job job = optionalJob.get();

        if (!jobSeeker.getDeleted() && !job.getDeleted()) {
            boolean hasApplied = jobApplicationRepository.existsByJobSeekerAndJob(jobSeeker, job);

            if (!hasApplied) {
                JobApplication jobApplication = new JobApplication();
                jobApplication.setJobSeeker(jobSeeker);
                jobApplication.setJob(job);
               
                jobApplication.setFirstName(request.getFirstName());
                jobApplication.setMiddleName(request.getMiddleName());
                jobApplication.setLastName(request.getLastName());
                jobApplication.setEmail(request.getEmail());
                jobApplication.setGender(request.getGender());
                jobApplication.setPhone(request.getPhone());
                jobApplication.setCoverLetter(request.getCoverLetter());
                jobApplication.setDate(request.getDate());
                jobApplication.setMonth(request.getMonth());
                jobApplication.setYear(request.getYear());
                jobApplication.setStreet(request.getStreet());
                jobApplication.setCity(request.getCity());
                jobApplication.setState(request.getState());
                jobApplication.setPostalCode(request.getPostalCode());

                jobApplicationRepository.save(jobApplication);

                return ResponseEntity.ok("Job application submitted successfully.");
            } else {
                return ResponseEntity.badRequest().body("Job application already exists for this job seeker and job.");
            }
        }
    } else {
        return ResponseEntity.badRequest().body("Failed to apply for the job.");
    }

    return ResponseEntity.badRequest().body("Failed to apply for the job.");
}

@DeleteMapping("withdrawapplication/{jobId}/{jobSeekerId}")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void deleteJobApplication(@PathVariable("jobId") Long jobId, @PathVariable("jobSeekerId") Long jobSeekerId) {
 
    Optional<JobApplication> optionalJobApplication = jobApplicationRepository.findByJobIdAndJobSeekerId(jobId, jobSeekerId);
    if (optionalJobApplication.isPresent()) {
        JobApplication jobApplication = optionalJobApplication.get();
        jobApplicationRepository.delete(jobApplication);
    } 
}

@GetMapping("/jobApplications/JobSeeker/{jobSeekerId}/appliedJobs")
public ResponseEntity<List<Job>> getAppliedJobsByJobSeekerId(@PathVariable Long jobSeekerId) {
    try {
        Optional<JobSeeker> optionalJobSeeker = jobSeekerRepository.findById(jobSeekerId);
        if (optionalJobSeeker.isPresent()) {
            JobSeeker jobSeeker = optionalJobSeeker.get();

            List<Job> appliedJobs = jobSeeker.getApplications().stream()
                    .map(JobApplication::getJob)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(appliedJobs);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}



    @GetMapping("/job-applications")
public ResponseEntity<List<JobApplicationDTO>> getAllJobApplications() {
    List<JobApplication> jobApplications = jobApplicationRepository.findAll();
    List<JobApplicationDTO> jobApplicationDTOs = jobApplications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    return ResponseEntity.ok(jobApplicationDTOs);
}
private JobApplicationDTO convertToDTO(JobApplication jobApplication) {
    JobApplicationDTO jobApplicationDTO = new JobApplicationDTO();
    jobApplicationDTO.setId(jobApplication.getId());
    jobApplicationDTO.setFirstName(jobApplication.getFirstName());
    jobApplicationDTO.setMiddleName(jobApplication.getMiddleName());
    jobApplicationDTO.setLastName(jobApplication.getLastName());
    jobApplicationDTO.setEmail(jobApplication.getEmail());
    jobApplicationDTO.setGender(jobApplication.getGender());
    jobApplicationDTO.setPhone(jobApplication.getPhone());
    jobApplicationDTO.setCoverLetter(jobApplication.getCoverLetter());
    jobApplicationDTO.setDate(jobApplication.getDate());
    jobApplicationDTO.setMonth(jobApplication.getMonth());
    jobApplicationDTO.setYear(jobApplication.getYear());
    jobApplicationDTO.setStreet(jobApplication.getStreet());
    jobApplicationDTO.setCity(jobApplication.getCity());
    jobApplicationDTO.setState(jobApplication.getState());
    jobApplicationDTO.setPostalCode(jobApplication.getPostalCode());
    jobApplicationDTO.setSelected(jobApplication.getSelected());
    jobApplicationDTO.setJobSeekerid(jobApplication.getJobSeeker() != null ? jobApplication.getJobSeeker().getId() : 0);
    return jobApplicationDTO;
}

@GetMapping("/jobApplications/{jobId}")
public ResponseEntity<?> getJobApplicationsByJobId(@PathVariable Long jobId) {
    List<JobApplication> jobApplications = jobApplicationRepository.findByJobId(jobId);

    if (!jobApplications.isEmpty()) {
        List<JobApplicationDTO> jobApplicationDTOs = new ArrayList<>();
        for (JobApplication jobApplication : jobApplications) {
            JobApplicationDTO jobApplicationDTO = convertToDTO(jobApplication);
            jobApplicationDTOs.add(jobApplicationDTO);
        }
        return ResponseEntity.ok(jobApplicationDTOs);
    } else {
        return ResponseEntity.notFound().build();
    }

}

@GetMapping("/jobApplications/JobSeeker/{jobSeekerId}")
public ResponseEntity<?> getJobApplicationsByJobSeekerId(@PathVariable Long jobSeekerId) {
    List<JobApplication> jobApplications = jobApplicationRepository.findByJobSeekerId(jobSeekerId);

    if (!jobApplications.isEmpty()) {
        List<JobApplicationDTO> jobApplicationDTOs = new ArrayList<>();
        for (JobApplication jobApplication : jobApplications) {
            JobApplicationDTO jobApplicationDTO = convertToDTO(jobApplication);
            jobApplicationDTOs.add(jobApplicationDTO);
        }
        return ResponseEntity.ok(jobApplicationDTOs);
    } else {
        return ResponseEntity.notFound().build();
    }

}    @GetMapping("/jobs")
public ResponseEntity<List<JobDTO>> getAllJobs() {
   
    try {
        List<Job> jobs = jobRepository.findAll();
        List<JobDTO> jobDTOs = jobs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

   

        return ResponseEntity.ok(jobDTOs);
   
           
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    
}private JobDTO convertToDTO(Job job) {
    JobDTO jobDTO = new JobDTO();
    jobDTO.setId(job.getId());
    jobDTO.setTitle(job.getTitle());
    jobDTO.setDescription(job.getDescription());
    jobDTO.setLocation(job.getLocation());
    jobDTO.setSalary(job.getSalary());
    jobDTO.setRequirements(job.getRequirements());
    jobDTO.setJobType(job.getJobType());

    if (job.getEmployer() != null) {
        EmployerDTO employerDTO = new EmployerDTO();
        employerDTO.setId(job.getEmployer().getId());
        employerDTO.setName(job.getEmployer().getName());
        employerDTO.setDescription(job.getEmployer().getDescription());
        employerDTO.setLocation(job.getEmployer().getLocation());
        jobDTO.setEmployer(employerDTO);
    }

    return jobDTO;
}


    @GetMapping("/jobs/chart")
    public  ResponseEntity<List<Job>> getAllJobsevendeleted() {
        try {
         
            List<Job> job = jobRepository.findAll();
            return ResponseEntity.ok(job);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable(value = "id") Long jobId)
            throws ResourceNotFoundException {
              
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found for this id :: " + jobId));
        return ResponseEntity.ok().body(job);
    }

    
@PutMapping("/jobs/{id}")
public ResponseEntity<Job> updateJob(@PathVariable(value = "id") Long jobId, @RequestBody Job updatedJob)
    throws ResourceNotFoundException {
    Job job = jobRepository.findById(jobId)
        .orElseThrow(() -> new ResourceNotFoundException("Job not found for this id :: " + jobId));
    
    BeanUtils.copyProperties(updatedJob, job, "id");
    
    final Job updatedJobEntity = jobRepository.save(job);
    return ResponseEntity.ok(updatedJobEntity);
}

   
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJobById(@PathVariable(value = "id") Long jobId)
            throws ResourceNotFoundException {
         
               Job job= jobRepository.findById(jobId)
               .orElseThrow(() -> new ResourceNotFoundException("Job not found for this id :: " + jobId));
                job.setDeleted(true); 
                jobRepository.save(job);
                        
                return ResponseEntity.ok().build();
    }

@PostMapping("/jobs")
public ResponseEntity<Job> addJob(@RequestBody Job newJob) {
    Long employerId = newJob.getEmployer().getId();
    Employers existingEmployer = employerRepository.findById(employerId).orElse(null);

    if (existingEmployer != null) {
        newJob.setEmployer(existingEmployer);
        final Job addedJob = jobRepository.save(newJob);
        return ResponseEntity.ok(addedJob);
    } else {
        return ResponseEntity.notFound().build();
    }
}


@GetMapping("/employers/{id}")
public ResponseEntity<Employers> getEmployerById(@PathVariable(value = "id") Long employerId)
        throws ResourceNotFoundException {
            Session session = entityManager.unwrap(Session.class);
            session.enableFilter("deletedFilter").setParameter("isDeleted", false);
            Employers employer = employerRepository.findById(employerId)
            .orElseThrow(() -> new ResourceNotFoundException("Employer not found for this id :: " + employerId));
    return ResponseEntity.ok().body(employer);
}
@GetMapping("/employers/{id}/jobs")
public List<Job> getJobsByEmployerId(@PathVariable(value = "id") Long employerId)
    throws ResourceNotFoundException {
Employers employer = employerRepository.findById(employerId)

        .orElseThrow(() -> new ResourceNotFoundException("Employer not found for this id :: " + employerId));

List<Job> jobs = employer.getJobs();

return jobs;
}

@DeleteMapping("/employers/{id}")
public ResponseEntity<?> deleteEmployerById(@PathVariable(value = "id") Long employerId)
    throws ResourceNotFoundException {
Employers employer = employerRepository.findById(employerId)
        .orElseThrow(() -> new ResourceNotFoundException("Employer not found for this id :: " + employerId));

Users user = employer.getUser();
if (user != null) {
    employer.setUser(null);
    employerRepository.save(employer); 
    userRepository.delete(user); 
}

employer.setDeleted(true);
employerRepository.save(employer);

List<Job> jobs = employer.getJobs();
for (Job job : jobs) {
    job.setDeleted(true);
    jobRepository.save(job);
}

return ResponseEntity.ok().build();
}


}