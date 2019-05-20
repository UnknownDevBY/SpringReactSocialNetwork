package com.network.service.impl;

import com.network.component.PrivacySettingsDtoTransformer;
import com.network.component.UserDtoTransformer;
import com.network.dto.PrivacySettingsDto;
import com.network.dto.UserDto;
import com.network.model.Message;
import com.network.model.User;
import com.network.repository.MessageRepository;
import com.network.repository.UserRepository;
import com.network.service.ConversationService;
import com.network.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class ConversationServiceImpl implements ConversationService {

    @Autowired private UserRepository userRepository;
    @Autowired private MessageRepository messageRepository;
    @Autowired private UserDtoTransformer userDtoTransformer;
    @Autowired private PrivacySettingsDtoTransformer privacySettingsDtoTransformer;
    @Autowired private UserService userService;


    @Override
    public Message saveMessage(int id, User currentUser, String content) {
        User opponent = userRepository.getById(id);
        PrivacySettingsDto privacySettings =
                privacySettingsDtoTransformer.toPrivacySettingsDto(currentUser, opponent,
                userService.areFriends(currentUser.getId(), opponent.getId()));
        Message message = new Message();
        if(privacySettings.isCanSendMessages()) {
            message.setFrom(currentUser);
            message.setTo(opponent);
            message.setContent(content);
            message.setSendingTime(new Timestamp(System.currentTimeMillis()));
            messageRepository.save(message);
        } else throw new RuntimeException("You're not allowed to send messages");
        return message;
    }

    @Override
    public UserDto getOpponent(int id) {
        User user = userRepository.getById(id);
        return userDtoTransformer.toUserDto(user);
    }
}
