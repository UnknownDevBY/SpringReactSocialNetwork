package com.network.controller;

import com.network.model.Log;
import com.network.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class LogController {

    @Autowired private LogRepository logRepository;

    @GetMapping("/log")
    public Map getLog() {
        Map<String, Object> model = new HashMap<>();
        List<Log> logs = logRepository.findAll();
        Collections.reverse(logs);
        model.put("logs", logs);
        return model;
    }
}
