package com.network.controller;

import com.network.component.CurrentUser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogoutController {

    @RequestMapping("/logout/success")
    public void logout() {
        CurrentUser.user = null;
    }
}
