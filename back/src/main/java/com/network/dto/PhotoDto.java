package com.network.dto;

import com.network.model.Comment;
import com.network.model.Photo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PhotoDto {

    private Photo photo;
    private Integer likesCount;
    private boolean isLikedByCurrentUser;
    private List<Comment> comments;
}
