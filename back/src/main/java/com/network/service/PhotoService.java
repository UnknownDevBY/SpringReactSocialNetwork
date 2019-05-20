package com.network.service;

import com.network.dto.PhotoDto;
import com.network.model.Community;
import com.network.model.Photo;
import com.network.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PhotoService {

    PhotoDto getPhoto(int id, User currentUser);
    void savePhoto(Boolean makeAvatar, MultipartFile newPhoto, User currentUser, Community community, String album) throws IOException;
    Integer getNextPhoto(Photo photo);
    Integer getPrevPhoto(Photo photo);
    boolean canDelete(User currentUser, Photo photo);
}
