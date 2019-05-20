package com.network.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDto {

    private UserDto friend;
    private int authorId;
    private String lastMessage;
}
