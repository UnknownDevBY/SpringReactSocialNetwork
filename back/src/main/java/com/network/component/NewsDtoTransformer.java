package com.network.component;

import com.network.dto.NewsDto;
import com.network.model.Photo;
import com.network.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NewsDtoTransformer {

    @Autowired private PhotoDtoTransformer photoDtoTransformer;
    @Autowired private PostDtoTransformer postDtoTransformer;

    public NewsDto toNewsDto(Photo photo, Post post, int currentUserId) {
        NewsDto newsDto = new NewsDto();
        if(photo != null)
            newsDto.setPhoto(photoDtoTransformer.toPhotoDto(photo, currentUserId));
        if(post != null)
            newsDto.setPost(postDtoTransformer.toPostDto(post, currentUserId));
        return newsDto;
    }
}
