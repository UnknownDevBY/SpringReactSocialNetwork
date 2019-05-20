package com.network.dto;

import com.network.model.Post;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostDto {

    private Post post;
    private String avatarTitle;
    private Integer likesCount;
    private boolean likedByCurrentUser;
    private List<CommentDto> comments;
}
