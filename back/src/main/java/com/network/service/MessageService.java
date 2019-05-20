package com.network.service;

import com.network.dto.MessageDto;

import java.util.List;

public interface MessageService {

    List<MessageDto> getOpponents(int id);
}
