package com.network.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.network.controller"))
                .paths(regex("/*"))
                .build()
                .apiInfo(metaInfo());
    }

    private ApiInfo metaInfo() {
        return new ApiInfo(
                "Spring Boot Social Network",
                "PostgreSQL as DB, deployed on Heroku",
                "1.0",
                "Terms of Service",
                new Contact("Vlad Efimchik", "https://vk.com/ya_bog_ty_lox",
                        "cerambite2@gmail.com"),
                "Apache License Version 2.0",
                "https://www.apache.org/licesen.html"
        );
    }
}
