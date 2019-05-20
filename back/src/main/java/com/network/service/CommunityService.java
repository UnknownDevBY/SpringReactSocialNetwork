package com.network.service;

import com.network.dto.CommunityDto;
import com.network.dto.PostDto;
import com.network.dto.UserDto;
import com.network.model.Community;
import com.network.model.CommunitySubscriber;
import com.network.model.User;

import java.util.List;

public interface CommunityService {

    List<CommunityDto> findCommunitiesByUserSubscribed(String value, User currentUser);
    List<CommunityDto> getCommunitiesWhereUserIsAdmin(String value, User currentUser);
    List<PostDto> getPosts(Community community, User currentUser);
    List<UserDto> getSubscribers(Community community);
    void createCommunity(Community community, User currentUser);
    void updateSubscription(int communityId, User currentUser);
    List<CommunityDto> collectToCommunityDto(List<Community> communities);
    void editCommunity(int id, Community community, User currentUser);
    void confirmSubscription(int communityId, int userId, User currentUser);
    boolean isRequestsListAllowed(User currentUser, Community community);
    List<CommunitySubscriber> getSubscriptionRequests(Community community);
}
