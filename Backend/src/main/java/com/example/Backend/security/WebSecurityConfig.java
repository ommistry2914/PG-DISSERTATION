package com.example.Backend.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.example.Backend.security.jwt.AuthEntryPointJwt;
import com.example.Backend.security.jwt.AuthTokenFilter;
import com.example.Backend.service.UserDetailsServiceImp;

@Configuration

@EnableWebSecurity
@EnableMethodSecurity
//(securedEnabled = true,
//jsr250Enabled = true,
//prePostEnabled = true) // by default
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
  @Autowired
  UserDetailsServiceImp userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

//@Override
//public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
//  authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//}

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());

    return authProvider;
  }

//@Bean
//@Override
//public AuthenticationManager authenticationManagerBean() throws Exception {
//  return super.authenticationManagerBean();
//}

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

//@Override
//protected void configure(HttpSecurity http) throws Exception {
//  http.cors().and().csrf().disable()
//    .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//    .authorizeRequests().antMatchers("/api/auth/**").permitAll()
//    .antMatchers("/api/test/**").permitAll()
//    .anyRequest().authenticated();
//
//  http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//}
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(request -> request
            .requestMatchers(new AntPathRequestMatcher("/api/auth/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/api/test/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/ws/*")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/chat/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/app/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/user/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/chatroom/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/notification/**")).permitAll()           // Allow access to endpoints with query parameters using antMatchers            
            .requestMatchers(new AntPathRequestMatcher("/guides/**")).permitAll()
           
            .anyRequest().permitAll()

        )
        .authenticationProvider(authenticationProvider())
        .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
        .build();
}




}