package com.example.Backend.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        // Initialize Cloudinary with your configuration
        Cloudinary cloudinary = new Cloudinary("cloudinary://574524458533497:0LwEW8vLbz3cCnHIbcQVjbA_xxU@dlf8u5l7a");
        return cloudinary;
    }
}
