package com.network.controller;

import com.network.component.CurrentUser;
import com.network.model.User;
import com.network.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MessageController {

    @Autowired private MessageService messageService;

    @GetMapping("/messages")
    public Map showMessages() {
        User currentUser = CurrentUser.user;
        Map<String, Object> model = new HashMap<>();
        model.put("currentUser", currentUser);
        model.put("messageWindows", messageService.getOpponents(currentUser.getId()));
        return model;
    }
}
