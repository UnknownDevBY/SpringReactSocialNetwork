package com.network.dto;

import com.network.model.Comment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {

    private Comment comment;
    private String avatarTitle;
}
