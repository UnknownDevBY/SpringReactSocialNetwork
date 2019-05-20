package com.network.controller;

import com.network.component.CurrentUser;
import com.network.model.PhotoAlbum;
import com.network.model.User;
import com.network.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AlbumController {

    @Autowired private AlbumService albumService;

    @GetMapping("/albums/{ownerId}")
    public Map showAlbum(@PathVariable int ownerId) {
        User currentUser = CurrentUser.user;
        if(!albumService.allowAccessToAlbums(ownerId, currentUser))
            return null;
        Map<String, Object> model = new HashMap<>();
        model.put("currentUser", currentUser);
        model.put("defaultAlbum", albumService.getDefaultAlbum(ownerId));
        model.put("albums", albumService.getUserAlbums(ownerId));
        return model;
    }

    @GetMapping("/albums/{userId}/{albumId}")
    public Map showAlbumPhotos(@PathVariable int userId,
                            @PathVariable int albumId) {
        User currentUser = CurrentUser.user;
        Map<String, Object> model = new HashMap<>();
        if(albumService.allowAccessToAlbums(userId, currentUser)) {
            model.put("currentUser", currentUser);
            model.put("photos", albumService.getPhotos(userId, albumId));
            return model;
        }
        return null;
    }

    @PostMapping("/albums/add")
    public PhotoAlbum saveNewAlbum(@NotBlank @RequestParam String title) {
        User currentUser = CurrentUser.user;
        return albumService.addAlbum(title, currentUser);
    }
}
