package com.network.service.impl;

import com.network.component.PhotoDtoTransformer;
import com.network.component.PostDtoTransformer;
import com.network.component.PrivacySettingsDtoTransformer;
import com.network.component.UserDtoTransformer;
import com.network.dto.PhotoDto;
import com.network.dto.PostDto;
import com.network.dto.PrivacySettingsDto;
import com.network.dto.UserDto;
import com.network.model.Community;
import com.network.model.Friendship;
import com.network.model.Post;
import com.network.model.User;
import com.network.repository.FriendshipRepository;
import com.network.repository.PhotoRepository;
import com.network.repository.PostRepository;
import com.network.repository.UserRepository;
import com.network.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired private FriendshipRepository friendshipRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PostRepository postRepository;
    @Autowired private PhotoRepository photoRepository;
    @Autowired private UserDtoTransformer userDtoTransformer;
    @Autowired private FriendServiceImpl friendsService;
    @Autowired private PostDtoTransformer postDtoTransformer;
    @Autowired private PhotoDtoTransformer photoDtoTransformer;
    @Autowired private PrivacySettingsDtoTransformer privacySettingsDtoTransformer;

    @Override
    public PostDto savePost(int id, String content, User currentUser, Community community) {
        Post post = new Post();
        post.setPostTime(new Timestamp(System.currentTimeMillis()));
        post.setContent(content);
        post.setAuthor(currentUser);
        if (community == null) {
            post.setOwner(userRepository.getById(id));
        } else post.setCommunity(community);
        postRepository.save(post);
        return postDtoTransformer.toPostDto(post, currentUser.getId());
    }

    @Override
    public List<UserDto> getFriends(User pageUser) {
        return friendsService.getAllFriends(pageUser).stream()
                .map(user -> userDtoTransformer.toUserDto(user)).collect(Collectors.toList());
    }

    @Override
    public boolean areFriends(int id1, int id2) {
        return isFirstFriendToSecond(id1, id2) && isFirstFriendToSecond(id2, id1);
    }

    @Override
    public boolean isFirstFriendToSecond(int id1, int id2) {
        Friendship value = friendshipRepository.getByFrom_IdAndTo_Id(id1, id2);
        return value != null;
    }

    @Override
    public PrivacySettingsDto getPrivacySettings(User currentUser, User pageUser, boolean areFriends) {
        return privacySettingsDtoTransformer.toPrivacySettingsDto(currentUser, pageUser, areFriends);
    }

    @Override
    public List<PostDto> getPosts(User pageUser, User currentUser) {
        int currentUserId = currentUser != null ? currentUser.getId() : 0;
        return postRepository.getByOwnerOrderByPostTimeDesc(pageUser).stream()
                .map(post -> postDtoTransformer.toPostDto(post, currentUserId))
                .collect(Collectors.toList());
    }

    @Override
    public List<PhotoDto> getPhotos(User pageUser, User currentUser) {
        int currentUserId = currentUser != null ? currentUser.getId() : 0;
        return photoRepository.getByUserOrderByDateOfPostDesc(pageUser).stream()
                .map(photo -> photoDtoTransformer.toPhotoDto(photo, currentUserId))
                .collect(Collectors.toList());
    }

    @Override
    public void modifyRelation(User currentUser, User pageUser) {
        Friendship relation = friendshipRepository.getByFromAndTo(currentUser, pageUser);
        if(relation == null) {
            relation = new Friendship();
            relation.setFrom(currentUser);
            relation.setTo(pageUser);
            friendshipRepository.save(relation);
        }
        else friendshipRepository.delete(relation);
    }

    @Override
    public void updateBlacklist(User currentUser, int id) {
        if(currentUser.getId() != id) {
            List<Integer> blacklist = currentUser.getBlacklist();
            if(blacklist.contains(id))
                blacklist.remove((Object) id);
            else {
                blacklist.add(id);
                Friendship friendship =
                        friendshipRepository.getByFrom_IdAndTo_Id(currentUser.getId(), id);
                if(friendship != null)
                    friendshipRepository.delete(friendship);
            }
        }
        userRepository.save(currentUser);
    }
}
