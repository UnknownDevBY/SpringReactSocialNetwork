package com.network.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 63)
    @NotBlank
    private String title;

    @Column(length = 127)
    private String description;

    private boolean closed;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;

    @JsonIgnore
    @OneToMany(mappedBy = "community")
    private Set<Photo> photos;

    @JsonIgnore
    @OneToMany(mappedBy = "community", fetch = FetchType.EAGER)
    private Set<Post> posts;

    @JsonIgnore
    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL)
    private List<CommunitySubscriber> subscribers;

    @Override
    public boolean equals(Object obj) {
        if (obj == null || getClass() != obj.getClass())
            return false;
        else {
            Community community = (Community) obj;
            return id == community.id;
        }
    }
}
