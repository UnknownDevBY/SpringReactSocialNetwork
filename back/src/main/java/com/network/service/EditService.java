package com.network.service;

import com.network.model.User;

public interface EditService {

    boolean saveEdit(User currentUser, User user, String pass);
}
