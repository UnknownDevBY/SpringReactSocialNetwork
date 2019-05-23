package com.network.controller;

import com.network.model.User;
import com.network.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class NewsController {

    @Autowired private NewsService newsService;

    @GetMapping("/news")
    public Map showNews(@AuthenticationPrincipal User currentUser) {
        Map<String, Object> model = new HashMap<>();
        model.put("currentUser", currentUser);
        model.put("allNews", newsService.getNews(currentUser));
        return model;
    }
}
