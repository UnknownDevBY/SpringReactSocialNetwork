package com.network.service;

import com.network.dto.CommunityDto;
import com.network.dto.PostDto;
import com.network.dto.UserDto;
import com.network.model.Comment;
import com.network.model.User;

import java.util.List;

public interface SearchService {

    List<UserDto> getAllUsers(User currentUser);
    List<PostDto> findAllPostsWithHashtags(int currentUserId);
    List<CommunityDto> getAllCommunities();
}
