package com.network.service.impl;

import com.network.component.PrivacySettingsDtoTransformer;
import com.network.dto.PrivacySettingsDto;
import com.network.model.Photo;
import com.network.model.PhotoAlbum;
import com.network.model.User;
import com.network.repository.PhotoAlbumRepository;
import com.network.repository.PhotoRepository;
import com.network.repository.UserRepository;
import com.network.service.AlbumService;
import com.network.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumServiceImpl implements AlbumService {

    @Autowired private PhotoAlbumRepository albumRepository;
    @Autowired private PhotoRepository photoRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private UserService userService;
    @Autowired private PrivacySettingsDtoTransformer privacySettingsDtoTransformer;

    @Override
    public List<PhotoAlbum> getUserAlbums(int id) {
        return albumRepository.getAllByUser_Id(id);
    }

    @Override
    public PhotoAlbum getDefaultAlbum(int id) {
        PhotoAlbum photoAlbum = new PhotoAlbum();
        photoAlbum.setTitle("All Photos");
        photoAlbum.setPhotos(photoRepository.getAllByUser_IdOrderByIdDesc(id));
        return photoAlbum;
    }

    @Override
    public PhotoAlbum addAlbum(String title, User currentUser) {
        if(!albumRepository.existsByTitleAndUser(title, currentUser)) {
            PhotoAlbum album = new PhotoAlbum();
            album.setId((int)albumRepository.count() + 1);
            album.setTitle(title);
            album.setUser(currentUser);
            albumRepository.save(album);
            return album;
        } else {
            throw new RuntimeException("You already have album titled " + title);
        }
    }

    @Override
    public boolean allowAccessToAlbums(int ownerId, User currentUser) {
        User albumOwner = userRepository.getById(ownerId);
        if (albumOwner == null)
            return false;
        PrivacySettingsDto privacySettings =
                privacySettingsDtoTransformer
                        .toPrivacySettingsDto(currentUser, albumOwner,
                                userService.areFriends(ownerId, currentUser != null ? currentUser.getId() : 0));
        return privacySettings.isArePhotosAllowed();
    }

    @Override
    public List<Photo> getPhotos(int userId, int albumId) {
        return (albumId == 0)
                ? photoRepository.getAllByUser_IdOrderByIdDesc(userId)
                : photoRepository.getAllByPhotoAlbum_IdOrderByIdDesc(albumId);
    }
}
