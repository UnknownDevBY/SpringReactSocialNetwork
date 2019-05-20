package com.network.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3Service {

    void uploadFile(String name, MultipartFile file) throws IOException;
    void deleteFile(String name);
}
