package com.network.component;

import com.network.dto.MessageDto;
import com.network.model.Message;
import com.network.repository.MessageRepository;
import com.network.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessageDtoTransformer {

    @Autowired private UserRepository userRepository;
    @Autowired private UserDtoTransformer userDtoTransformer;
    @Autowired private MessageRepository messageRepository;

    public MessageDto toMessageDto(int currentUserId, int opponentId) {
        MessageDto messageDto = new MessageDto();
        Message lastMessage = messageRepository.getLastMessage(currentUserId, opponentId);
        messageDto.setAuthorId(lastMessage.getFrom().getId());
        messageDto.setLastMessage(lastMessage.getContent());
        messageDto.setFriend(userDtoTransformer.toUserDto(userRepository.getById(opponentId)));
        return messageDto;
    }

}
