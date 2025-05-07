package com.bits.vaccination.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bits.vaccination.portal.dto.AdminDTO;
import com.bits.vaccination.portal.service.StudentService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin( origins = "*")
public class AuthController {
	
	 @Autowired
	    private StudentService studentService;
	 
	 @PostMapping("/admin/login")
	    public ResponseEntity<?> adminLogin(@RequestBody AdminDTO loginRequest) {
	        
	        if (loginRequest != null) {
	            // If valid, return successful response (you could return a JWT token or user details here)
	        	studentService.adminLogin(loginRequest);
	        	if(studentService.adminLogin(loginRequest) != null)
	        		return ResponseEntity.ok(loginRequest);
	        }
	            // Invalid credentials, return unauthorized status
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid admin credentials.");
	        
	    }
}