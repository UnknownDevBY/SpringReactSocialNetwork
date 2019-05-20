package com.network.repository;

import com.network.model.Community;
import com.network.model.Post;
import com.network.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> getByOwnerOrderByPostTimeDesc(User user);
    List<Post> getByCommunityOrderByPostTimeDesc(Community community);
    Post getById(int id);

    @Query(value = "select * from post where content similar to '.*#\\S+.*'", nativeQuery = true)
    List<Post> getAllByWhereExistsHashtag();
}
