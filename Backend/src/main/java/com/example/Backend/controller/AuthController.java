package com.example.Backend.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.ERole;
import com.example.Backend.model.Role;
import com.example.Backend.model.User;
import com.example.Backend.payloads.request.LoginRequest;
import com.example.Backend.payloads.request.SignupRequest;
import com.example.Backend.payloads.response.JwtResponse;
import com.example.Backend.payloads.response.MessageResponse;
import com.example.Backend.repository.RoleRepository;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.security.jwt.JwtUtils;
import com.example.Backend.service.UserDetailsImp;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		logger.info("Generated JWT token: {}", jwt);
		UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

				   // Set JWT token as an HttpOnly cookie
				   Cookie cookie = new Cookie("jwtToken", jwt);
				   cookie.setMaxAge(3600); // Set the expiry time of the cookie (in seconds)
				   cookie.setHttpOnly(true); // Make the cookie HttpOnly
				   cookie.setPath("/"); // Set the cookie path
				   response.addCookie(cookie); // Add the cookie to the response

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}
	
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}
	
		// Create new user's account
		User user = new User(signUpRequest.getUsername(),
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));
	
		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();
	
		if (strRoles == null || strRoles.isEmpty()) {
			Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				logger.info(role);
				switch (role) {
					
					case "student":
						Role adminRole = roleRepository.findByName(ERole.ROLE_STUDENT)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(adminRole);
						break;
					case "guide":
					try {
						// Attempt to find the role
						Role modRole = roleRepository.findByName(ERole.ROLE_GUIDE)
								.orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_MODERATOR' not found in database."));
						roles.add(modRole);
					} catch (RuntimeException e) {
						// Log the error
						logger.error("Error occurred while fetching role: " + e.getMessage());
						// Handle the error or rethrow it
						throw e;
					}
						break;
				}
			});
		}
	
		user.setRoles(roles);
		userRepository.save(user);
	
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	@PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Clear the JWT token cookie
        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setMaxAge(0); // Set the expiry time to zero to delete the cookie
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        // You may also want to clear any authentication-related information from the SecurityContextHolder
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok("Logged out successfully");
    }
}