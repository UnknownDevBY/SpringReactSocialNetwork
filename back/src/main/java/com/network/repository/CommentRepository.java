package com.network.repository;

import com.network.model.Comment;
import com.network.model.Photo;
import com.network.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Comment getById(int id);
    List<Comment> getAllByPost(Post post);
    List<Comment> getAllByPhoto(Photo photo);
}
