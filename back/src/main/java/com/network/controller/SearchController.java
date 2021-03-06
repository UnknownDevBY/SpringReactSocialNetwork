package com.network.controller;

import com.network.model.User;
import com.network.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class SearchController {

    @Autowired private SearchService searchService;

    @RequestMapping("/search")
    public Map showAllUsers(@AuthenticationPrincipal User currentUser) {
        Map<String, Object> model = new HashMap<>();
        model.put("posts", searchService.findAllPostsWithHashtags(
                currentUser != null ? currentUser.getId() : 0));
        model.put("communities", searchService.getAllCommunities());
        model.put("users", searchService.getAllUsers(currentUser));
        model.put("currentUser", currentUser);
        return model;
    }
}
