package com.network.service.impl;

import com.network.component.PostDtoTransformer;
import com.network.component.UserDtoTransformer;
import com.network.dto.CommunityDto;
import com.network.dto.PostDto;
import com.network.dto.UserDto;
import com.network.model.Post;
import com.network.model.User;
import com.network.repository.CommunityRepository;
import com.network.repository.PostRepository;
import com.network.repository.UserRepository;
import com.network.service.CommunityService;
import com.network.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchServiceImpl implements SearchService {

    @Autowired private UserRepository userRepository;
    @Autowired private PostRepository postRepository;
    @Autowired private CommunityRepository communityRepository;
    @Autowired private CommunityService communityService;
    @Autowired private PostDtoTransformer postDtoTransformer;
    @Autowired private UserDtoTransformer userDtoTransformer;

    @Override
    public List<UserDto> getAllUsers(User currentUser) {
        List<User> users = userRepository.findAll();
        users.remove(currentUser);
        return users.stream().map(user -> userDtoTransformer.toUserDto(user)).collect(Collectors.toList());
    }

    @Override
    public List<PostDto> findAllPostsWithHashtags(int currentUserId) {

        List<Post> posts = postRepository.getAllByWhereExistsHashtag();
        if(posts != null)
            return posts.stream().map(post -> postDtoTransformer.toPostDto(post, currentUserId))
                .collect(Collectors.toList());
        else return new ArrayList<>();
    }

    @Override
    public List<CommunityDto> getAllCommunities() {
        return communityService.collectToCommunityDto(communityRepository.findAll());
    }
}
