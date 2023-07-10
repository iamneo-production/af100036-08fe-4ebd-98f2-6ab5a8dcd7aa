package com.example.springapp.model;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "cms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

@Column(nullable = false, columnDefinition = "TEXT")
private String content;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileExtension;

    @Lob
    private byte[] imageData;

}
