package com.network.repository;

import com.network.model.Community;
import com.network.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Integer> {

    Community getById(int id);
    List<Community> getAllByAdmin(User user);
    List<Community> getAllByAdminAndTitle(User user, String title);
}