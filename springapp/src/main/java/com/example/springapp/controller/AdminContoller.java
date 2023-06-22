package com.example.springapp.controller;
import org.springframework.web.multipart.MultipartFile;
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

import com.example.springapp.model.Cms;
import com.example.springapp.repository.CmsRepository;
import com.example.springapp.model.Task;
import com.example.springapp.repository.TaskRepository;


@CrossOrigin(origins = "https://8081-becfabfadacaeaebfceaeaadbdbabf.project.examly.io")
@RestController
@RequestMapping("/admins")
public class AdminContoller {

    @Autowired
    private  CmsRepository cmsRepository;
    @Autowired
    private TaskRepository taskRepository;
   
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
        String fileExtension = getFileExtension(originalFileName);
    
        Cms post = new Cms();
        post.setFileName(fileName);
        post.setFileExtension(fileExtension);
        post.setImageData(file.getBytes());
        post.setTitle(title);
        post.setContent(content);
    
        cmsRepository.save(post);
    
        return ResponseEntity.ok("Success");
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
    
}
