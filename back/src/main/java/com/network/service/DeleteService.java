package com.network.service;

import com.network.model.User;

public interface DeleteService {

    void deleteObject(String type, int id, User currentUser);
}
