package com.network.controller;

import com.network.component.CurrentUser;
import com.network.model.User;
import com.network.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class LikeController {

    @Autowired private LikeService likeService;

    @GetMapping("/likes/{type}/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void like(@PathVariable String type,
                       @PathVariable int id) {
        User currentUser = CurrentUser.user;
        likeService.addLike(type, id, currentUser);
    }
}
