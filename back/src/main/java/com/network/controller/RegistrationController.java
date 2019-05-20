package com.network.controller;

import com.network.model.User;
import com.network.repository.UserRepository;
import com.network.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class RegistrationController {

    @Autowired private RegistrationService registrationService;
    @Autowired private UserRepository userRepository;
    private User user;

    @PostMapping("/registration/1")
    @ResponseStatus(HttpStatus.OK)
    public void registration(@ModelAttribute User user) {
        if(userRepository.existsByEmail(user.getEmail()))
            throw new RuntimeException("User with this email already exists");
        this.user = registrationService.setUserStep1(user);
    }

    @PostMapping("/registration/2")
    @ResponseStatus(HttpStatus.OK)
    public void addUser(@ModelAttribute User modelUser) {
        registrationService.setUserStep2(modelUser, user);
        this.user = null;
    }
}
