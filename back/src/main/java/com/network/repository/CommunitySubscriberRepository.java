package com.network.repository;

import com.network.model.Community;
import com.network.model.CommunitySubscriber;
import com.network.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunitySubscriberRepository extends JpaRepository<CommunitySubscriber, Integer> {

    CommunitySubscriber getByCommunityAndUser(Community community, User user);
    List<CommunitySubscriber> getAllByCommunityAndConfirmedFalse(Community community);
    List<CommunitySubscriber> getAllByUserAndConfirmedTrue(User user);
    List<CommunitySubscriber> getAllByCommunity_TitleStartsWithAndUserAndConfirmedTrue(String title, User user);
}
