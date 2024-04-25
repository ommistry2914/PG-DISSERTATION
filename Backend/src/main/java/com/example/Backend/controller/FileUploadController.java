package com.example.Backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
public class FileUploadController {

    private static final String UPLOAD_FOLDER = "C:\\Users\\ommis\\AppData\\Local\\Temp\\tomcat.8080.7384810754046742084\\work\\Tomcat\\localhost\\ROOT\\assets\\";

    @PostMapping("/upload")
    public String uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            return "Please select a file to upload";
        }

        try {
            // Get the filename and create the destination file
            String fileName = file.getOriginalFilename();
            File destinationFile = new File(UPLOAD_FOLDER + fileName);

            // Save the uploaded file to the destination folder
            file.transferTo(destinationFile);

            return "File uploaded successfully: " + fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file";
        }
    }
}
