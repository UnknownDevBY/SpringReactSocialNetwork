package com.network.service.impl;

import com.network.aspect.annotation.Registration;
import com.network.model.User;
import com.network.repository.UserRepository;
import com.network.service.MailSenderService;
import com.network.service.PhotoService;
import com.network.service.RegistrationService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.sql.Date;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired private UserRepository userRepository;
    @Autowired private MailSenderService mailSenderService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Value("${activation.url}") private String url;

    @Override
    public User setUserStep1(User modelUser) {
        modelUser.setPassword(passwordEncoder.encode(modelUser.getPassword()));
        return modelUser;
    }

    @Override
    public void setUserStep2(User modelUser, User thisUser) {
        thisUser.setSex(modelUser.getSex());
        thisUser.setInterests(modelUser.getInterests());
        thisUser.setBio(modelUser.getBio());
        thisUser.setCity(modelUser.getCity());
        thisUser.setDateOfBirth(modelUser.getDateOfBirth());
        thisUser.setRole(User.Role.USER);
        saveUser(thisUser);
    }

    @Override
    public String activateUser(String activationCode) {
        User user = userRepository.getByActivationCode(activationCode);
        if(user == null)
            throw new RuntimeException("This activation code is not valid");
        user.setActivationCode(null);
        String name = user.getName();
        userRepository.save(user);
        return name;
    }

    @Registration
    public void saveUser(@Valid User user) {
        user.setActivationCode(RandomString.make());
        userRepository.save(user);
        new Thread(() -> mailSenderService.send(user.getEmail(), "Activation code",
                String.format("You're welcome in Social Network. Visit please %s/%s",
                        url, user.getActivationCode()))).start();
    }
}
