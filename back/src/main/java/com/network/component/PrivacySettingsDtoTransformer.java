package com.network.component;

import com.network.dto.PrivacySettingsDto;
import com.network.model.PrivacySettings;
import com.network.model.User;
import com.network.repository.PrivacySettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PrivacySettingsDtoTransformer {

    @Autowired private PrivacySettingsRepository privacySettingsRepository;

    public PrivacySettingsDto toPrivacySettingsDto(User currentUser, User pageUser, boolean areFriends) {
        PrivacySettings privacySettings = privacySettingsRepository.getByUser(pageUser);
        PrivacySettingsDto privacySet;
        if(currentUser == null || currentUser.getId() != pageUser.getId()) {
            privacySet = new PrivacySettingsDto();
            privacySet.setAreFriendsAllowed(areFriends, privacySettings != null ? privacySettings.getFriends() : 'a');
            privacySet.setArePhotosAllowed(areFriends, privacySettings != null ? privacySettings.getPhotos() : 'a');
            privacySet.setCanLeaveComments(areFriends, privacySettings != null ? privacySettings.getComments() : 'a');
            privacySet.setCanSendMessages(areFriends, privacySettings != null ? privacySettings.getMessages() : 'a');
            privacySet.setFullInfoAllowed(areFriends, privacySettings != null ? privacySettings.getFullInfo() : 'a');
            privacySet.setCanLeavePosts(areFriends, privacySettings != null ? privacySettings.getPostAuthors() : 'a');
        }
        else privacySet = new PrivacySettingsDto();
        return privacySet;
    }
}
