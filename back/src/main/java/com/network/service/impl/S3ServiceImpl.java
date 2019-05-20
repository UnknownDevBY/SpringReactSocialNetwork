package com.network.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.network.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class S3ServiceImpl implements S3Service {

    @Autowired
    private AmazonS3 s3client;

    @Value("${s3.bucket}")
    private String bucketName;

    @Override
    public void uploadFile(String name, MultipartFile file) throws IOException {
        s3client.putObject(new PutObjectRequest(bucketName, name, file.getInputStream(), null));
    }

    @Override
    public void deleteFile(String name) {
        s3client.deleteObject(bucketName, name);
    }
}
