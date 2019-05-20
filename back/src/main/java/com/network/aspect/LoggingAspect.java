package com.network.aspect;

import com.network.model.Log;
import com.network.model.User;
import com.network.repository.LogRepository;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Date;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    @Autowired private LogRepository logRepository;

    @After("authorizationPointcut()")
    private void aroundAuthorization(JoinPoint joinPoint) {
        action(joinPoint, 'a');
    }

    @After("registrationPointcut()")
    private void aroundRegistration(JoinPoint joinPoint) {
        action(joinPoint, 'r');
    }

    @SneakyThrows
    private void action(JoinPoint joinPoint, char action) {
        String email = ((User) joinPoint.getArgs()[0]).getEmail();
        String logAction;
        if(action == 'a')
            logAction = "authorized";
        else logAction = "registered";
        String info = String.format("Successfully %s user with username '%s'", logAction, email);
        log.info(info);
        saveLog(email, action);
    }

    private void saveLog(String email, char action) {
        Log log = new Log();
        log.setEmail(email);
        log.setAt(new Timestamp(System.currentTimeMillis()));
        log.setPlatform("Localhost");
        log.setUserAction(action);
        logRepository.save(log);
    }

    @Pointcut("@annotation(com.network.aspect.annotation.Authorization)")
    private void authorizationPointcut() {}

    @Pointcut("@annotation(com.network.aspect.annotation.Registration)")
    private void registrationPointcut() {}
}
