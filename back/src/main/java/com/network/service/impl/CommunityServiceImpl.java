package com.network.service.impl;

import com.network.component.CommunityDtoTransformer;
import com.network.component.PostDtoTransformer;
import com.network.component.UserDtoTransformer;
import com.network.dto.CommunityDto;
import com.network.dto.PostDto;
import com.network.dto.UserDto;
import com.network.model.Community;
import com.network.model.CommunitySubscriber;
import com.network.model.User;
import com.network.repository.CommunityRepository;
import com.network.repository.CommunitySubscriberRepository;
import com.network.repository.PostRepository;
import com.network.repository.UserRepository;
import com.network.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommunityServiceImpl implements CommunityService {

    @Autowired private CommunityRepository communityRepository;
    @Autowired private PostRepository postRepository;
    @Autowired private PostDtoTransformer postDtoTransformer;
    @Autowired private UserDtoTransformer userDtoTransformer;
    @Autowired private CommunitySubscriberRepository communitySubscriberRepository;
    @Autowired private CommunityDtoTransformer communityDtoTransformer;
    @Autowired private UserRepository userRepository;

    @Override
    public List<CommunityDto> findCommunitiesByUserSubscribed(String value, User currentUser) {
        if(value == null)
            return collectToCommunityDto(collectCommunities(communitySubscriberRepository
                    .getAllByUserAndConfirmedTrue(currentUser)));
        else
            return collectToCommunityDto(collectCommunities(communitySubscriberRepository
                    .getAllByCommunity_TitleStartsWithAndUserAndConfirmedTrue(value, currentUser)));
    }

    @Override
    public List<PostDto> getPosts(Community community, User currentUser) {
        int currentUserId = currentUser != null ? currentUser.getId() : 0;
        return postRepository.getByCommunityOrderByPostTimeDesc(community).stream()
                .map(post -> postDtoTransformer.toPostDto(post, currentUserId))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getSubscribers(Community community) {
        List<User> communitySubscribers = new LinkedList<>();
        Iterator<CommunitySubscriber> iterator = community.getSubscribers().iterator();
        CommunitySubscriber communitySubscriber;
        for(int i = 0; i != community.getSubscribers().size() && i != 6; ++i) {
            communitySubscriber = iterator.next();
            if(communitySubscriber.isConfirmed())
                communitySubscribers.add(communitySubscriber.getUser());
        }
        return communitySubscribers.stream().map(subscriber -> userDtoTransformer.toUserDto(subscriber))
                .collect(Collectors.toList());
    }

    @Override
    public void createCommunity(Community community, User currentUser) {
        CommunitySubscriber communitySubscriber = new CommunitySubscriber();
        communitySubscriber.setUser(currentUser);
        communitySubscriber.setCommunity(community);
        communitySubscriber.setConfirmed(true);
        community.setAdmin(currentUser);
        community.setSubscribers(Collections.singletonList(communitySubscriber));
        communityRepository.save(community);
    }

    @Override
    public void updateSubscription(int communityId, User currentUser) {
        Community community = communityRepository.getById(communityId);
        CommunitySubscriber communitySubscriber = communitySubscriberRepository.getByCommunityAndUser(community, currentUser);
        if(communitySubscriber == null) {
            communitySubscriber = new CommunitySubscriber();
            communitySubscriber.setUser(currentUser);
            communitySubscriber.setCommunity(community);
            communitySubscriber.setConfirmed(!community.isClosed());
            communitySubscriberRepository.save(communitySubscriber);
        } else communitySubscriberRepository.delete(communitySubscriber);
    }

    @Override
    public List<CommunityDto> getCommunitiesWhereUserIsAdmin(String value, User currentUser) {
        if(value == null)
            return communityRepository.getAllByAdmin(currentUser)
                    .stream().map(community -> communityDtoTransformer.toCommunityDto(community))
                    .collect(Collectors.toList());
        else
            return communityRepository.getAllByAdminAndTitle(currentUser, value)
                    .stream().map(community -> communityDtoTransformer.toCommunityDto(community))
                    .collect(Collectors.toList());
    }

    @Override
    public List<CommunityDto> collectToCommunityDto(List<Community> communities) {
        return communities.stream().map(community -> communityDtoTransformer.toCommunityDto(community))
                .collect(Collectors.toList());
    }

    @Override
    public void editCommunity(int id, Community community, User currentUser) {
        Community originalCommunity = communityRepository.getById(id);
        if(originalCommunity.getAdmin().getId() != currentUser.getId())
            throw new RuntimeException("Admin is not equal to current user");
        originalCommunity.setTitle(community.getTitle());
        originalCommunity.setDescription(community.getDescription());
        originalCommunity.setClosed(community.isClosed());
        communityRepository.save(originalCommunity);
    }

    @Override
    public void confirmSubscription(int communityId, int userId, User currentUser) {
        Community community = communityRepository.getById(communityId);
        if(community.getAdmin().getId() != currentUser.getId())
            throw new RuntimeException("You're not allowed to confirm requests");
        CommunitySubscriber subscriber =
                communitySubscriberRepository.getByCommunityAndUser(community, userRepository.getById(userId));
        subscriber.setConfirmed(true);
        communitySubscriberRepository.save(subscriber);
    }

    @Override
    public boolean isRequestsListAllowed(User currentUser, Community community) {
        if(currentUser == null)
            return false;
        return community.isClosed() && currentUser.getId() == community.getAdmin().getId();
    }

    @Override
    public List<CommunitySubscriber> getSubscriptionRequests(Community community) {
        return communitySubscriberRepository.getAllByCommunityAndConfirmedFalse(community);
    }

    private List<Community> collectCommunities(List<CommunitySubscriber> communitySubscribers) {
        return communitySubscribers.stream().map(CommunitySubscriber::getCommunity).collect(Collectors.toList());
    }
}
