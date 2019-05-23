package com.network.controller;

import com.network.dto.CommunityDto;
import com.network.dto.PostDto;
import com.network.model.Community;
import com.network.model.User;
import com.network.repository.CommunityRepository;
import com.network.repository.CommunitySubscriberRepository;
import com.network.repository.PhotoRepository;
import com.network.service.CommunityService;
import com.network.service.PhotoService;
import com.network.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CommunityController {

    @Autowired private CommunityService communityService;
    @Autowired private CommunityRepository communityRepository;
    @Autowired private PhotoRepository photoRepository;
    @Autowired private PhotoService photoService;
    @Autowired private UserService userService;
    @Autowired private CommunitySubscriberRepository communitySubscriberRepository;

    @GetMapping("/communities")
    public Map show(@RequestParam(required = false) String value, @AuthenticationPrincipal User currentUser) {
        Map<String, Object> model = new HashMap<>();
        List<CommunityDto> myCommunities = communityService.findCommunitiesByUserSubscribed(value, currentUser);
        List<CommunityDto> adminCommunities = communityService.getCommunitiesWhereUserIsAdmin(value, currentUser);
        model.put("currentUser", currentUser);
        model.put("myCommunities", myCommunities);
        model.put("value", value);
        model.put("adminCommunities", adminCommunities);
        return model;
    }

    @GetMapping("/communities/public/{id}")
    public Map showPublic(@PathVariable int id, @AuthenticationPrincipal User currentUser) {
        Map<String, Object> model = new HashMap<>();
        if(!communityRepository.existsById(id))
            return null;
        Community community = communityRepository.getById(id);
        model.put("community", community);
        model.put("posts", communityService.getPosts(community, currentUser));
        model.put("avatar", photoRepository.getCommunityAvatar(community));
        model.put("subscribers", communityService.getSubscribers(community));
        model.put("currentUser", currentUser);
        model.put("subscription", communitySubscriberRepository.getByCommunityAndUser(community, currentUser));
        if(communityService.isRequestsListAllowed(currentUser, community))
            model.put("requests", communityService.getSubscriptionRequests(community));
        return model;
    }

    @GetMapping("/communities/public/{communityId}/subscribe")
    @ResponseStatus(HttpStatus.OK)
    public void subscribe(@PathVariable int communityId, @AuthenticationPrincipal User currentUser) {
        communityService.updateSubscription(communityId, currentUser);
    }

    @GetMapping("/communities/public/{communityId}/subscription/{userId}/confirm")
    @ResponseStatus(HttpStatus.OK)
    public void confirmSubscription(@PathVariable int communityId,
                                    @PathVariable int userId,
                                    @AuthenticationPrincipal User currentUser) {
        communityService.confirmSubscription(communityId, userId, currentUser);
    }

    @PostMapping(value = "/communities/create", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.OK)
    public void createCommunity(@Valid @ModelAttribute Community community,
                                @RequestParam(required = false) MultipartFile avatar,
                                @AuthenticationPrincipal User currentUser) throws IOException {
        communityService.createCommunity(community, currentUser);
        photoService.savePhoto(true, avatar, null, community, null);
    }

    @PostMapping("/communities/public/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PostDto createPost(@PathVariable int id,
                              @Valid @RequestParam @NotBlank String content,
                              @AuthenticationPrincipal User currentUser) {
        return userService.savePost(id, content, currentUser, communityRepository.getById(id));
    }

    @PostMapping(value = "/communities/public/{id}/edit", consumes = "multipart/form-data")
    public void editCommunity(@PathVariable int id,
                              @Valid @ModelAttribute Community community,
                              @RequestParam(required = false) MultipartFile avatar,
                                @AuthenticationPrincipal User currentUser) throws IOException {
        communityService.editCommunity(id, community, currentUser);
        photoService.savePhoto(true, avatar, null, community, null);
    }
}
