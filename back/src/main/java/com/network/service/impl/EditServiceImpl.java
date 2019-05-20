package com.network.service.impl;

import com.network.model.User;
import com.network.repository.UserRepository;
import com.network.service.EditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class EditServiceImpl implements EditService {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public boolean saveEdit(User currentUser, User user, String pass) {
        if(wrongAge(user.getDateOfBirth())) {
            return false;
        }
        if(pass != null && !pass.isEmpty()) {
            currentUser.setPassword(passwordEncoder.encode(pass));
        }
        currentUser.setDateOfBirth(user.getDateOfBirth());
        if(user.getCity() != null && !user.getCity().isEmpty())
            currentUser.setCity(user.getCity());
        if(user.getName() != null && !user.getName().isEmpty())
            currentUser.setName(user.getName());
        if(user.getSurname() != null && !user.getSurname().isEmpty())
            currentUser.setSurname(user.getSurname());
        currentUser.setSex(user.getSex());
        if(user.getBio() != null && !user.getBio().isEmpty())
            currentUser.setBio(user.getBio());
        if(user.getInterests() != null && !user.getInterests().isEmpty())
            currentUser.setInterests(user.getInterests());
        if(user.getPassword() != null && !user.getPassword().isEmpty())
            currentUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(currentUser);
        return true;
    }

    private boolean wrongAge(Date dateOfBirth) {
        return dateOfBirth == null || System.currentTimeMillis() - dateOfBirth.getTime() < 441_504_000_000L;
    }
}
