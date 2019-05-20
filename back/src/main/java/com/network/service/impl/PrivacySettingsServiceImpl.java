package com.network.service.impl;

import com.network.model.PrivacySettings;
import com.network.model.User;
import com.network.repository.PrivacySettingsRepository;
import com.network.service.PrivacySettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrivacySettingsServiceImpl implements PrivacySettingsService {

    @Autowired private PrivacySettingsRepository privacySettingsRepository;

    @Override
    public void savePrivacySettings(PrivacySettings settings, User currentUser) {
        PrivacySettings currentPrivacySettings = privacySettingsRepository.getByUser(currentUser);
        if(currentPrivacySettings == null) {
            settings.setUser(currentUser);
            privacySettingsRepository.save(settings);
        } else {
            currentPrivacySettings.updateSettings(settings);
            privacySettingsRepository.save(currentPrivacySettings);
        }
    }
}
