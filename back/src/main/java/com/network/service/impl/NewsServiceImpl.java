package com.network.service.impl;

import com.network.component.NewsDtoTransformer;
import com.network.dto.NewsDto;
import com.network.model.CommunitySubscriber;
import com.network.model.Photo;
import com.network.model.Post;
import com.network.model.User;
import com.network.service.FriendService;
import com.network.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired private FriendService friendService;
    @Autowired private NewsDtoTransformer newsDtoTransformer;

    @Override
    public Set<NewsDto> getNews(User currentUser) {
        Set<NewsDto> news = new TreeSet<>();
        Set<User> friends = friendService.getAllSubscriptions(currentUser);
        Set<User> subscriptions = friendService.getAllFriends(currentUser);
        addPosts(news, currentUser, friends, subscriptions);
        addPhotos(news, currentUser, friends, subscriptions);
        return news;
    }

    private void addPosts(Set<NewsDto> news, User currentUser, Set<User> friends, Set<User> subscriptions) {
        List<Post> posts = new ArrayList<>();
        currentUser.getSubscriptions().stream().map(CommunitySubscriber::getCommunity)
                .collect(Collectors.toList())
                .forEach(community -> posts.addAll(community.getPosts()));
        friends.forEach(friendship -> posts.addAll(friendship.getOwners()));
        subscriptions.forEach(friendship -> posts.addAll(friendship.getOwners()));
        posts.forEach(post -> news.add(newsDtoTransformer.toNewsDto(null, post, currentUser.getId())));
    }

    private void addPhotos(Set<NewsDto> news, User currentUser, Set<User> friends, Set<User> subscriptions) {
        List<Photo> photos = new ArrayList<>();
        friends.forEach(friendship -> photos.addAll(friendship.getPhotos()));
        subscriptions.forEach(friendship -> photos.addAll(friendship.getPhotos()));
        photos.forEach(photo -> news.add(newsDtoTransformer.toNewsDto(photo, null, currentUser.getId())));
    }
}
