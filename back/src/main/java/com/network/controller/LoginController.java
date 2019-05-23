package com.network.controller;

import com.network.model.User;
import com.network.repository.UserRepository;
import com.network.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired AuthenticationManager authenticationManager;
    @Autowired JwtTokenProvider jwtTokenProvider;
    @Autowired UserRepository userRepository;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public Map signIn(@RequestParam String itech_pass, @RequestParam String itech_login) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(itech_login, itech_pass));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.getByEmail(itech_login);
        if(user == null)
            throw new RuntimeException("Wrong email");
        String role = user.getRole().name();
        String token = jwtTokenProvider.createToken(itech_login, Collections.singletonList(role));
        Map<String, Object> model = new HashMap<>();
        model.put("token", token);
        return model;
    }
}
