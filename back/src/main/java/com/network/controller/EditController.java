package com.network.controller;

import com.network.model.PrivacySettings;
import com.network.model.User;
import com.network.repository.PrivacySettingsRepository;
import com.network.service.EditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class EditController {

    @Autowired private EditService editService;
    @Autowired private PrivacySettingsRepository privacySettingsRepository;

    @GetMapping("/edit")
    public Map openEdit(@AuthenticationPrincipal User currentUser) {
        Map<String, Object> model = new HashMap<>();
        PrivacySettings privacySettings = privacySettingsRepository.getByUser(currentUser);
        model.put("currentUser", currentUser);
        model.put("curPrivSet", privacySettings);
        return model;
    }

    @PostMapping("/edit")
    public void saveEdit(@ModelAttribute User user,
                         @RequestParam(required = false) String pass,
                         @AuthenticationPrincipal User currentUser) {
        if(!editService.saveEdit(currentUser, user, pass))
            throw new RuntimeException("you must be aged 14+");
    }
}
