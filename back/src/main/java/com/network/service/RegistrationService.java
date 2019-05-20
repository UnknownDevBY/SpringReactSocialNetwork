package com.network.service;

import com.network.model.User;

public interface RegistrationService {

    User setUserStep1(User modelUser);
    void setUserStep2(User modelUser, User thisUser);
    String activateUser(String activationCode);
}
