package com.network.dto;

import lombok.Getter;

@Getter
public class PrivacySettingsDto {

    private boolean canSendMessages = true;
    private boolean isFullInfoAllowed = true;
    private boolean arePhotosAllowed = true;
    private boolean areFriendsAllowed = true;
    private boolean canLeavePosts = true;
    private boolean canLeaveComments = true;

    public void setCanSendMessages(boolean areFriends, Character messages) {
        if(messages != null && ((!areFriends && messages == 'f') || messages == 'm')) {
            canSendMessages = false;
        }
    }

    public void setFullInfoAllowed(boolean areFriends, Character fullInfo) {
        if(fullInfo != null && ((!areFriends && fullInfo == 'f') || fullInfo == 'm')) {
            isFullInfoAllowed = false;
        }
    }

    public void setArePhotosAllowed(boolean areFriends, Character photos) {
        if(photos != null && ((!areFriends && photos == 'f') || photos == 'm')) {
            arePhotosAllowed = false;
        }
    }

    public void setAreFriendsAllowed(boolean areFriends, Character friends) {
        if(friends != null && ((!areFriends && friends == 'f') || friends == 'm')) {
            areFriendsAllowed = false;
        }
    }

    public void setCanLeavePosts(boolean areFriends, Character postAuthors) {
        if(postAuthors != null && ((!areFriends && postAuthors == 'f') || postAuthors == 'm')) {
            canLeavePosts = false;
        }
    }

    public void setCanLeaveComments(boolean areFriends, Character comments) {
        if(comments != null && ((!areFriends && comments == 'f') || comments == 'm')) {
            canLeaveComments = false;
        }
    }
}
