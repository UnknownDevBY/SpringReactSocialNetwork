package com.network.controller;

import com.network.dto.CommentDto;
import com.network.model.User;
import com.network.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@RestController
public class CommentController {

    @Autowired private CommentService commentService;

    @PostMapping("/comment/{type}/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CommentDto comment(@PathVariable String type,
                              @PathVariable int id,
                              @Valid @RequestParam @NotBlank String content,
                              @AuthenticationPrincipal User currentUser) {
        return commentService.addComment(type, content, id, currentUser);
    }
}
