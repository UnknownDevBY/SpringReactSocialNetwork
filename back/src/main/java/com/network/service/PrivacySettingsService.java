package com.network.service;

import com.network.model.PrivacySettings;
import com.network.model.User;

public interface PrivacySettingsService {

    void savePrivacySettings(PrivacySettings settings, User currentUser);
}
