package com.network.service.impl;

import com.google.common.io.Files;
import com.network.component.LikesListTransformer;
import com.network.dto.PhotoDto;
import com.network.model.Community;
import com.network.model.Photo;
import com.network.model.User;
import com.network.repository.CommentRepository;
import com.network.repository.PhotoAlbumRepository;
import com.network.repository.PhotoRepository;
import com.network.service.PhotoService;
import com.network.service.S3Service;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService {

    @Autowired private PhotoRepository photoRepository;
    @Autowired private CommentRepository commentRepository;
    @Autowired private PhotoAlbumRepository albumRepository;
    @Autowired private S3Service s3Service;
    @Autowired private LikesListTransformer likesListTransformer;

    @Override
    public PhotoDto getPhoto(int id, User currentUser) {
        PhotoDto photoDto = new PhotoDto();
        Photo photo = photoRepository.getById(id);
        photoDto.setPhoto(photo);
        photoDto.setComments(commentRepository.getAllByPhoto(photo));
        List<Integer> likes = likesListTransformer.deserialize(photo.getLikes());
        photoDto.setLikedByCurrentUser(currentUser != null && likes.contains(currentUser.getId()));
        photoDto.setLikesCount(likes.size());
        return photoDto;
    }

    @Override
    public void savePhoto(Boolean makeAvatar, MultipartFile newPhoto, User currentUser, Community community, String album) throws IOException {
        if(newPhoto != null && !newPhoto.isEmpty()) {
            boolean isAvatar = makeAvatar != null;
            Photo photo = new Photo();
            String title = RandomString.make() + "." + Files.getFileExtension(newPhoto.getOriginalFilename());
            photo.setTitle(title);
            photo.setAvatar(isAvatar);
            photo.setWasAvatar(isAvatar);
            setPhotoOwners(album, currentUser, photo, isAvatar, community);
            s3Service.uploadFile(title, newPhoto);
            photo.setDateOfPost(new Timestamp(System.currentTimeMillis()));
            photoRepository.save(photo);
        }
    }

    @Override
    public Integer getNextPhoto(Photo photo) {
        return photo.getUser() != null
            ? photoRepository.getPreviousPhotoId(photo.getId(), photo.getUser().getId())
            : photoRepository.getPreviousCommunityPhotoId(photo.getId(), photo.getCommunity().getId());
    }

    @Override
    public Integer getPrevPhoto(Photo photo) {
        return photo.getUser() != null
                ? photoRepository.getNextPhotoId(photo.getId(), photo.getUser().getId())
                : photoRepository.getNextCommunityPhotoId(photo.getId(), photo.getCommunity().getId());
    }

    @Override
    public boolean canDelete(User currentUser, Photo photo) {
        if(currentUser == null)
            return false;
        if(photo.getUser() != null)
            return photo.getUser().getId() == currentUser.getId();
        return photo.getCommunity().getAdmin().getId() == currentUser.getId();
    }

    private void setPhotoOwners(String album, User currentUser, Photo photo, boolean isAvatar, Community community) {
        if(album != null) {
            photo.setPhotoAlbum(albumRepository.getByUserAndTitle(currentUser, album));
        }
        if (currentUser != null) {
            photo.setUser(currentUser);
            if(isAvatar)
                photoRepository.updateAvatars(currentUser.getId());
        }
        if (community != null) {
            photo.setCommunity(community);
            if(isAvatar)
                photoRepository.updateCommunityAvatars(community.getId());
        }
    }
}
