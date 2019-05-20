package com.network.service;

import com.network.dto.UserDto;
import com.network.model.Message;
import com.network.model.User;

public interface ConversationService {

    Message saveMessage(int id, User currentUser, String content);
    UserDto getOpponent(int id);
}
