package com.network.repository;

import com.network.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    User getByEmail(String email);
    User getById(int id);
    List<User> getAllByNameStartsWith(String value);
    List<User> getAllBySurnameStartsWith(String value);
    User getByActivationCode(String activationCode);
    boolean existsByEmail(String email);
}
