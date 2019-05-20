package com.network.component;

import com.network.dto.CommentDto;
import com.network.model.Comment;
import com.network.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentDtoTransformer {

    @Autowired private PhotoRepository photoRepository;

    public CommentDto toCommentDto(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setComment(comment);
        commentDto.setAvatarTitle(photoRepository.getUserAvatarTitle(comment.getUser()));
        return commentDto;
    }
}
