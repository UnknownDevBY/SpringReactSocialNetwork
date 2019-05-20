package com.network.service;

import com.network.dto.NewsDto;
import com.network.model.User;

import java.util.Set;

public interface NewsService {

    Set<NewsDto> getNews(User currentUser);
}
