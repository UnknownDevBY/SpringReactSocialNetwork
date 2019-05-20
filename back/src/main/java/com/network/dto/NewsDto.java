package com.network.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

public class NewsDto implements Comparable<NewsDto> {

    @Getter
    @Setter
    private PhotoDto photo;

    @Getter
    @Setter
    private PostDto post;

    @Override
    public int compareTo(NewsDto o) {
        Timestamp thisTime = photo != null ? photo.getPhoto().getDateOfPost() : post.getPost().getPostTime();
        Timestamp objTime = o.photo != null ? o.photo.getPhoto().getDateOfPost() : o.post.getPost().getPostTime();
        return objTime.compareTo(thisTime);
    }
}
