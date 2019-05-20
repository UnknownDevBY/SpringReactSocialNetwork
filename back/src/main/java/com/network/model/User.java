package com.network.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.annotation.MatchesPattern;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Email
    @Size(min = 5, max = 127)
    @JsonIgnore
    private String email;

    @NotBlank
    @Size(min = 2, max = 31)
    @MatchesPattern("^[а-яА-Я\\p{Cyrillic}a-zA-Z]+$")
    private String name;

    @NotBlank
    @Size(min = 3, max = 31)
    @MatchesPattern("^[а-яА-Я\\p{Cyrillic}a-zA-Z]+$")
    private String surname;

    @NotNull
    private char sex;

    @NotNull
    private Date dateOfBirth;

    @NotBlank
    @Size(min = 2, max = 31)
    @MatchesPattern("^[а-яА-Я\\p{Cyrillic}a-zA-Z]+$")
    private String city;

    @JsonIgnore
    private String activationCode;

    @JsonIgnore
    @NotBlank
    @Size(min = 6)
    private String password;

    private String bio;

    private String interests;

    private String status;

    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Photo> photos;

    @JsonIgnore
    @OneToMany(mappedBy = "from")
    private Set<Friendship> fromRequests;

    @JsonIgnore
    @OneToMany(mappedBy = "to")
    private Set<Friendship> toRequests;

    @JsonIgnore
    @OneToMany(mappedBy = "author")
    private Set<Post> authors;

    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private Set<Post> owners;

    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private PrivacySettings privacySettings;

    @JsonIgnore
    @OneToMany(mappedBy = "from")
    private Set<Message> fromMessages;

    @JsonIgnore
    @OneToMany(mappedBy = "to")
    private Set<Message> toMessages;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "admin")
    private Set<Community> adminIn;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<PhotoAlbum> photoAlbums;

    @JsonIgnore
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Integer> blacklist;

    @JsonIgnore
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "user")
    private List<CommunitySubscriber> subscriptions;

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(role);
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return activationCode == null;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || getClass() != obj.getClass())
            return false;
        else {
            User user = (User) obj;
            return id == user.id;
        }
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", sex=" + sex +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", city='" + city + '\'' +
                ", activationCode='" + activationCode + '\'' +
                ", password='" + password + '\'' +
                ", bio='" + bio + '\'' +
                ", interests='" + interests + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

    public enum Role implements GrantedAuthority {

        USER, ADMIN;

        @Override
        public String getAuthority() {
            return name();
        }
    }
}
