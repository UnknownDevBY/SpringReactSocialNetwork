package com.network.controller;

import com.network.model.User;
import com.network.service.DeleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class DeleteController {

    @Autowired private DeleteService deleteService;

    @GetMapping("/delete/{type}/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String type,
                       @PathVariable int id,
                       @AuthenticationPrincipal User currentUser) {
        deleteService.deleteObject(type, id, currentUser);
    }
}
