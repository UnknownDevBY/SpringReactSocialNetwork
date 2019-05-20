package com.network.service.impl;

import com.network.component.CommentDtoTransformer;
import com.network.dto.CommentDto;
import com.network.model.Comment;
import com.network.model.User;
import com.network.repository.CommentRepository;
import com.network.repository.PhotoRepository;
import com.network.repository.PostRepository;
import com.network.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired private PostRepository postRepository;
    @Autowired private PhotoRepository photoRepository;
    @Autowired private CommentRepository commentRepository;
    @Autowired private CommentDtoTransformer commentDtoTransformer;

    @Override
    public CommentDto addComment(String type, String content, int id, User currentUser) {
        Comment comment = new Comment();
        switch (type) {
            case "photo":
                comment.setPhoto(photoRepository.getById(id));
                break;
            case "post":
                comment.setPost(postRepository.getById(id));
                break;
            default:
                return null;
        }
        comment.setPostTime(new Timestamp(System.currentTimeMillis()));
        comment.setContent(content);
        comment.setUser(currentUser);
        commentRepository.save(comment);
        return commentDtoTransformer.toCommentDto(comment);
    }
}
