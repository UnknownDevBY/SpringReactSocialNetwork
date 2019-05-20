package com.network.dto;

import com.network.model.Photo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private int userId;
    private int age;
    private String userName;
    private String userSurname;
    private Photo avatar;
}
