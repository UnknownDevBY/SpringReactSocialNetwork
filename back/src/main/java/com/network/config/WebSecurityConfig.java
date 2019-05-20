package com.network.config;

import com.network.security.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired private UserDetailsService userDetailsService;
    @Autowired private PasswordEncoder passwordEncoder;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .httpBasic().disable()
                .csrf().disable()

                .authorizeRequests()
//                .antMatchers( "/registration/1", "/registration/2", "/login", "/communities/public/**", "/users/**", "/photos/**", "/activation/**", "/albums/**", "/friends/**", "/search/**").permitAll()
//                .antMatchers("/log").hasAuthority("ADMIN")
//                .anyRequest().authenticated()
                .anyRequest().permitAll()
                .and()

                .formLogin()
                .loginPage("/login")
                .usernameParameter("itech_login")
                .passwordParameter("itech_pass")
                .successForwardUrl("/search")
                .permitAll()
                .and()

                .logout()
                .logoutSuccessUrl("/logout/success")
                .permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder);
    }
}
