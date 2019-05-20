package com.network.repository;

import com.network.model.PhotoAlbum;
import com.network.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PhotoAlbumRepository extends JpaRepository<PhotoAlbum, Integer> {

    boolean existsByTitleAndUser(String title, User user);

    PhotoAlbum getByUserAndTitle(User user, String title);

    @Query(value = "SELECT title FROM photo_album WHERE user_id = ?1", nativeQuery = true)
    List<String> getAllTitlesByUserId(int id);

    List<PhotoAlbum> getAllByUser_Id(int id);
}
