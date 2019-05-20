package com.network.service;

import com.network.dto.PhotoDto;
import com.network.dto.PostDto;
import com.network.dto.PrivacySettingsDto;
import com.network.dto.UserDto;
import com.network.model.Community;
import com.network.model.User;

import java.util.List;

public interface UserService {

    PostDto savePost(int id, String content, User currentUser, Community community);
    List<UserDto> getFriends(User pageUser);
    boolean isFirstFriendToSecond(int id1, int id2);
    boolean areFriends(int id1, int id2);
    PrivacySettingsDto getPrivacySettings(User currentUser, User pageUser, boolean areFriends);
    List<PostDto> getPosts(User pageUser, User currentUser);
    List<PhotoDto> getPhotos(User pageUser, User currentUser);
    void modifyRelation(User currentUser, User pageUser);
    void updateBlacklist(User currentUser, int id);
}
