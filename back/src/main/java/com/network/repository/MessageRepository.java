package com.network.repository;

import com.network.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query(value = "SELECT * FROM Message WHERE (from_id = ?1 AND to_id = ?2) OR (from_id = ?2 AND to_id = ?1) ORDER BY sending_time DESC LIMIT 1", nativeQuery = true)
    Message getLastMessage(int id1, int id2);

    @Query(value = "SELECT DISTINCT(from_id) FROM Message WHERE from_id != ?1 AND to_id = ?1 UNION SELECT DISTINCT(to_id) FROM Message WHERE to_id != ?1 AND from_id = ?1", nativeQuery = true)
    List<Integer> getOpponentsId(int id);

    @Query(value = "SELECT * FROM Message WHERE (from_id = ?1 AND to_id = ?2) OR (from_id = ?2 AND to_id = ?1) ORDER BY id DESC", nativeQuery = true)
    List<Message> getAllMessages(int id1, int id2);
}
