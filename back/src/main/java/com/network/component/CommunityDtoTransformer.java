package com.network.component;

import com.network.dto.CommunityDto;
import com.network.model.Community;
import com.network.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommunityDtoTransformer {

    @Autowired private PhotoRepository photoRepository;

    public CommunityDto toCommunityDto(Community community) {
        CommunityDto communityDto = new CommunityDto();
        communityDto.setCommunity(community);
        communityDto.setAvatar(photoRepository.getCommunityAvatar(community));
        return communityDto;
    }
}
