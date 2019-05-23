package com.network.controller;

import com.network.model.PhotoAlbum;
import com.network.model.User;
import com.network.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AlbumController {

    @Autowired private AlbumService albumService;

    @GetMapping("/albums/{ownerId}")
    public Map showAlbum(@PathVariable int ownerId,
                         @AuthenticationPrincipal User currentUser) {
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
                                @PathVariable int albumId,
                               @AuthenticationPrincipal User currentUser) {
        Map<String, Object> model = new HashMap<>();
        if(albumService.allowAccessToAlbums(userId, currentUser)) {
            model.put("currentUser", currentUser);
            model.put("photos", albumService.getPhotos(userId, albumId));
            return model;
        }
        return null;
    }

    @PostMapping("/albums/add")
    public PhotoAlbum saveNewAlbum(@NotBlank @RequestParam String title,
                                   @AuthenticationPrincipal User currentUser) {
        return albumService.addAlbum(title, currentUser);
    }
}
