package com.network.service.impl;

import com.network.component.PrivacySettingsDtoTransformer;
import com.network.component.UserDtoTransformer;
import com.network.dto.PrivacySettingsDto;
import com.network.dto.UserDto;
import com.network.model.User;
import com.network.repository.FriendshipRepository;
import com.network.service.FriendService;
import com.network.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FriendServiceImpl implements FriendService {

    @Autowired private UserDtoTransformer userDtoTransformer;
    @Autowired private FriendshipRepository friendshipRepository;
    @Autowired private PrivacySettingsDtoTransformer privacySettingsDtoTransformer;
    @Autowired private UserService userService;

    @Override
    public List<UserDto> setRelation(Set<User> relation) {
        return relation.stream().map(userDtoTransformer::toUserDto).collect(Collectors.toList());
    }

    @Override
    public Set<User> getAllSubscribers(User pageUser) {
        Set<User> subscribers = new LinkedHashSet<>();
        friendshipRepository.getAllByTo(pageUser).forEach(friendship -> subscribers.add(friendship.getFrom()));
        friendshipRepository.getAllByFrom(pageUser).forEach(friendship -> subscribers.remove(friendship.getTo()));
        return subscribers;
    }

    @Override
    public Set<User> getAllSubscriptions(User pageUser) {
        Set<User> subscriptions = new LinkedHashSet<>();
        friendshipRepository.getAllByFrom(pageUser).forEach(friendship -> subscriptions.add(friendship.getTo()));
        friendshipRepository.getAllByTo(pageUser).forEach(friendship -> subscriptions.remove(friendship.getFrom()));
        return subscriptions;
    }

    @Override
    public Set<User> getAllFriends(User pageUser) {
        Set<User> friends = new LinkedHashSet<>();
        List<User> from = new ArrayList<>();
        friendshipRepository.getAllByTo(pageUser).forEach(friendship -> from.add(friendship.getFrom()));
        List<User> to = new ArrayList<>();
        friendshipRepository.getAllByFrom(pageUser).forEach(friendship -> to.add(friendship.getTo()));
        to.forEach(subscriber -> {
            if(from.contains(subscriber))
                friends.add(subscriber);
        });
        return friends;
    }

    @Override
    public boolean areFriendsAllowed(User pageUser, User currentUser) {
        boolean areFriends = userService.areFriends(currentUser != null ? currentUser.getId() : 0, pageUser.getId());
        PrivacySettingsDto privacySettings = privacySettingsDtoTransformer
                .toPrivacySettingsDto(currentUser, pageUser, areFriends);
        return privacySettings.isAreFriendsAllowed();
    }
}
