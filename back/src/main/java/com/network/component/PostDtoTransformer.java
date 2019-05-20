package com.network.component;

import com.network.dto.PostDto;
import com.network.model.Post;
import com.network.repository.CommentRepository;
import com.network.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostDtoTransformer {

    @Autowired private CommentRepository commentRepository;
    @Autowired private LikesListTransformer likesListTransformer;
    @Autowired private PhotoRepository photoRepository;
    @Autowired private CommentDtoTransformer commentDtoTransformer;

    public PostDto toPostDto(Post post, int currentUserId) {
        PostDto postDto = new PostDto();
        postDto.setPost(post);
        postDto.setComments(commentRepository.getAllByPost(post).stream()
                .map(comment -> commentDtoTransformer.toCommentDto(comment))
                .collect(Collectors.toList()));
        List<Integer> likes = likesListTransformer.deserialize(post.getLikes());
        postDto.setLikedByCurrentUser(likes.contains(currentUserId));
        postDto.setLikesCount(likes.size());
        if(post.getAuthor() == null)
            postDto.setAvatarTitle(photoRepository.getUserAvatarTitle(post.getAuthor()));
        else postDto.setAvatarTitle(photoRepository.getCommunityAvatarTitle(post.getCommunity()));
        return postDto;
    }
}
