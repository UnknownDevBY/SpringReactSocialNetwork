package com.network.controller;

import com.network.model.User;
import com.network.repository.UserRepository;
import com.network.service.FriendService;
import com.network.service.UserService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FriendController {

    @Autowired private UserRepository userRepository;
    @Autowired private UserService userService;
    @Autowired private FriendService friendService;

    @SneakyThrows
    @GetMapping("/friends/{id}")
    public Map showFriends(@PathVariable int id, @AuthenticationPrincipal User currentUser) {
        Map<String, Object> model = new HashMap<>();
        User pageUser = userRepository.getById(id);
        if(pageUser == null || !friendService.areFriendsAllowed(pageUser, currentUser))
            return null;
        model.put("currentUser", currentUser);
        model.put("friends", userService.getFriends(pageUser));
        model.put("subscribers", friendService.setRelation(friendService.getAllSubscribers(pageUser)));
        model.put("subscriptions", friendService.setRelation(friendService.getAllSubscriptions(pageUser)));
        return model;
    }
}
