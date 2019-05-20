package com.network.controller;

import com.network.component.CurrentUser;
import com.network.dto.PhotoDto;
import com.network.model.Photo;
import com.network.model.User;
import com.network.repository.CommentRepository;
import com.network.repository.PhotoRepository;
import com.network.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class PhotoController {

    @Autowired private PhotoService photoService;
    @Autowired private PhotoRepository photoRepository;
    @Autowired private CommentRepository commentRepository;


    @GetMapping("/photos/{id}")
    public Map showPhoto(@PathVariable int id) {
        User currentUser = CurrentUser.user;
        Photo photo = photoRepository.getById(id);
        Map<String, Object> model = new HashMap<>();
        User owner = photo.getUser();
        PhotoDto photoDto = photoService.getPhoto(id, currentUser);
        model.put("photo", photoDto);
        model.put("canDelete", photoService.canDelete(currentUser, photo));
        model.put("nextPhoto", photoService.getNextPhoto(photo));
        model.put("prevPhoto", photoService.getPrevPhoto(photo));
        if(owner != null) {
            model.put("owner", owner);
        }
        model.put("currentUser", currentUser);
        model.put("comments", commentRepository.getAllByPhoto(photoDto.getPhoto()));
        return model;
    }

    @PostMapping(value = "/photos/add", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.OK)
    public void addPhoto(@RequestParam(required = false) Boolean makeAvatar,
                         @RequestParam MultipartFile newPhoto,
                         @RequestParam(required = false) String album) throws IOException {
        User currentUser = CurrentUser.user;
        photoService.savePhoto(makeAvatar, newPhoto, currentUser, null, album);
    }
}
