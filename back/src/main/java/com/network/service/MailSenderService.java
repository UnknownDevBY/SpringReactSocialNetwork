package com.network.service;

public interface MailSenderService {

    void send(String to, String subject, String message);
}
