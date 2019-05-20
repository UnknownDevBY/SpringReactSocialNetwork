package com.network.repository;

import com.network.model.PrivacySettings;
import com.network.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivacySettingsRepository extends JpaRepository<PrivacySettings, Integer> {

    PrivacySettings getByUser(User user);
}
