package com.network.service.impl;

import com.network.component.LikesListTransformer;
import com.network.model.Photo;
import com.network.model.Post;
import com.network.model.User;
import com.network.repository.PhotoRepository;
import com.network.repository.PostRepository;
import com.network.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired private PostRepository postRepository;
    @Autowired private PhotoRepository photoRepository;
    @Autowired private LikesListTransformer likesListTransformer;

    @Override
    public void addLike(String type, int id, User currentUser) {
        int currentUserId = currentUser.getId();
        switch (type) {
            case "photo":
                Photo photo = photoRepository.getById(id);
                photo.setLikes(likesListTransformer.serialize(getUpdatedLikes(currentUserId, photo.getLikes())));
                photoRepository.save(photo);
                break;
            case "post":
                Post post = postRepository.getById(id);
                post.setLikes(likesListTransformer.serialize(getUpdatedLikes(currentUserId, post.getLikes())));
                postRepository.save(post);
                break;
        }
    }

    private List<Integer> getUpdatedLikes(int currentUserId, String entity) {
        List<Integer> likes = likesListTransformer.deserialize(entity);
        if(likes.contains(currentUserId))
            likes.remove((Object) currentUserId);
        else likes.add(currentUserId);
        return likes.isEmpty() ? null : likes;
    }
}
