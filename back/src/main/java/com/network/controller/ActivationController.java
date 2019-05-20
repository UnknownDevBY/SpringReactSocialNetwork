package com.network.controller;

import com.network.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ActivationController {

    @Autowired private RegistrationService registrationService;

    @GetMapping("/activation/{activationCode}")
    public Map activate(@PathVariable String activationCode) {
        String name = registrationService.activateUser(activationCode);
        Map<String, Object> model = new HashMap<>();
        model.put("name", name);
        return model;
    }
}
