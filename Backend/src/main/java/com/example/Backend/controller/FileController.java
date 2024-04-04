package com.example.Backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/files")
public class FileController {

    @Autowired
    private Cloudinary cloudinary;

    @PostMapping("/upload")
    public String uploadFile(MultipartFile file) throws IOException {
        // Upload file to Cloudinary
        Map<String, String> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

        // Return the URL of the uploaded file
        return result.get("url");
    }
}

