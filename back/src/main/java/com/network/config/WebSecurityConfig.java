package com.network.config;

import com.network.security.JwtConfigurer;
import com.network.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .authorizeRequests()
                .antMatchers( "/registration/1", "/registration/2", "/login").permitAll()
                .antMatchers(HttpMethod.GET, "/communities/public/**", "/users/**", "/photos/**", "/activation/**", "/albums/**", "/friends/**", "/search/**").permitAll()
                .antMatchers("/log").hasAuthority("ADMIN")
                .anyRequest().authenticated()
                .and()

                .logout()
                .logoutUrl("/logout")
                .permitAll()
                .and()

                .apply(new JwtConfigurer(jwtTokenProvider));
    }

}
