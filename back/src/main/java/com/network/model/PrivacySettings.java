package com.network.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class PrivacySettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 1)
    private Character messages;

    @Column(length = 1)
    private Character fullInfo;

    @Column(length = 1)
    private Character photos;

    @Column(length = 1)
    private Character friends;

    @Column(length = 1)
    private Character postAuthors;

    @Column(length = 1)
    private Character comments;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void updateSettings(PrivacySettings privacySettings) {
        messages = privacySettings.messages;
        fullInfo = privacySettings.fullInfo;
        photos = privacySettings.photos;
        friends = privacySettings.friends;
        postAuthors = privacySettings.postAuthors;
        comments = privacySettings.comments;
    }
}
