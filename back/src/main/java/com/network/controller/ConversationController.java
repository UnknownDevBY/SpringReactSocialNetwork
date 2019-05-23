package com.network.controller;

import com.network.model.Message;
import com.network.model.User;
import com.network.repository.MessageRepository;
import com.network.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ConversationController {

    @Autowired private MessageRepository messageRepository;
    @Autowired private ConversationService conversationService;

    @GetMapping("/conversations/{id}")
    public Map openConversation(@PathVariable int id, @AuthenticationPrincipal User currentUser) {
        Map<String, Object> model = new HashMap<>();
        model.put("currentUser", currentUser);
        model.put("opponent", conversationService.getOpponent(id));
        model.put("messages", messageRepository.getAllMessages(currentUser.getId(), id));
        return model;
    }

    @PostMapping("/conversations/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Message sendMessage(@PathVariable int id,
                               @Valid @RequestParam @NotBlank String content,
                               @AuthenticationPrincipal User currentUser) {
        return conversationService.saveMessage(id, currentUser, content);
    }
}
