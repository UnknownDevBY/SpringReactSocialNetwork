package com.network.component;

import com.network.dto.PhotoDto;
import com.network.model.Photo;
import com.network.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PhotoDtoTransformer {

    @Autowired private CommentRepository commentRepository;
    @Autowired private LikesListTransformer likesListTransformer;

    public PhotoDto toPhotoDto(Photo photo, int currentUserId) {
        PhotoDto photoDto = new PhotoDto();
        photoDto.setPhoto(photo);
        photoDto.setComments(commentRepository.getAllByPhoto(photo));
        List<Integer> likes = likesListTransformer.deserialize(photo.getLikes());
        photoDto.setLikedByCurrentUser(likes.contains(currentUserId));
        photoDto.setLikesCount(likes.size());
        return photoDto;
    }
}
