package com.network.test;

import com.network.controller.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@WebAppConfiguration
@SpringBootTest
public class SmokeTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired private CommentController commentController;
    @Autowired private CommunityController communitiesController;
    @Autowired private ConversationController conversationController;
    @Autowired private DeleteController deleteController;
    @Autowired private EditController editController;
    @Autowired private FriendController friendController;
    @Autowired private LikeController likeController;
    @Autowired private MessageController messageController;
    @Autowired private NewsController newsController;
    @Autowired private PhotoController photoController;
    @Autowired private PrivacySettingsController privacySettingsController;
    @Autowired private RegistrationController registrationController;
    @Autowired private SearchController searchController;
    @Autowired private UserController userController;

    @Test
    public void contextLoads() {
        assertNotNull(commentController);
        assertNotNull(communitiesController);
        assertNotNull(conversationController);
        assertNotNull(deleteController);
        assertNotNull(editController);
        assertNotNull(friendController);
        assertNotNull(likeController);
        assertNotNull(messageController);
        assertNotNull(newsController);
        assertNotNull(photoController);
        assertNotNull(privacySettingsController);
        assertNotNull(registrationController);
        assertNotNull(searchController);
        assertNotNull(userController);
    }

    @Test
    public void testLinks() throws Exception {
        testLink("/", "index");
        testLink("/registration", "registration");
        testLink("/users/1", "user");
    }

    @Test
    @WithMockUser
    public void testMocked() throws Exception {
        testLink("/communities/create", "createGroup");
    }

    private void testLink(String url, String viewName) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(view().name(viewName));
    }
}
