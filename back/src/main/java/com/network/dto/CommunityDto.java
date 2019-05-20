package com.network.dto;

import com.network.model.Community;
import com.network.model.Photo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityDto {

    private Community community;
    private Photo avatar;
}
