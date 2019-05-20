package com.network.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LikesListTransformer {

    private ObjectMapper mapper = new ObjectMapper();

    @SneakyThrows
    public String serialize(List<Integer> likes) {
        if(likes != null) {
            return mapper.writeValueAsString(likes);
        }
        return null;
    }

    @SneakyThrows
    public List<Integer> deserialize(String str) {
        if(str != null) {
            return mapper.readValue(str, List.class);
        }
        return new ArrayList<>();
    }
}
