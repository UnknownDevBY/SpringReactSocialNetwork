package com.network.service;

import com.network.model.Photo;
import com.network.model.PhotoAlbum;
import com.network.model.User;

import java.util.List;

public interface AlbumService {

    List<PhotoAlbum> getUserAlbums(int id);
    PhotoAlbum getDefaultAlbum(int id);
    PhotoAlbum addAlbum(String title, User currentUser);
    boolean allowAccessToAlbums(int ownerId, User currentUser);
    List<Photo> getPhotos(int userId, int albumId);
}
