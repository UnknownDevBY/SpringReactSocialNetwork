package com.network.component;

import com.network.dto.UserDto;
import com.network.model.User;
import com.network.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDtoTransformer {

    @Autowired private PhotoRepository photoRepository;

    public UserDto toUserDto(User user) {
        int userId = user.getId();
        UserDto userDto = new UserDto();
        userDto.setUserName(user.getName());
        userDto.setAvatar(photoRepository.getAvatarByUserId(userId));
        userDto.setUserId(userId);
        userDto.setUserSurname(user.getSurname());
        userDto.setAge((int)((System.currentTimeMillis() - user.getDateOfBirth().getTime()) / 31_556_952_000L));
        return userDto;
    }
}
