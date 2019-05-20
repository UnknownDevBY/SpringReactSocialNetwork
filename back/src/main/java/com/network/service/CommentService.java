package com.network.service;

import com.network.dto.CommentDto;
import com.network.model.User;

public interface CommentService {

    CommentDto addComment(String type, String content, int id, User currentUser);
}
