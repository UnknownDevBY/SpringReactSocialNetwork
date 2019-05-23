package com.network.controller;

import com.network.model.PrivacySettings;
import com.network.model.User;
import com.network.service.PrivacySettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class PrivacySettingsController {

    @Autowired private PrivacySettingsService privacySettingsService;

    @PostMapping("/privacy-settings")
    @ResponseStatus(HttpStatus.OK)
    public void savePrivacySettings(@ModelAttribute PrivacySettings settings, @AuthenticationPrincipal User currentUser) {
        privacySettingsService.savePrivacySettings(settings, currentUser);
    }
}
