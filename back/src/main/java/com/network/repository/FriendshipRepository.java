package com.network.repository;

import com.network.model.Friendship;
import com.network.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {

    Set<Friendship> getAllByFrom(User from);
    Set<Friendship> getAllByTo(User to);
    Friendship getByFrom_IdAndTo_Id(int id1, int id2);
    Friendship getByFromAndTo(User from, User to);
}
