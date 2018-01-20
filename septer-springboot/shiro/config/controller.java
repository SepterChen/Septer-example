package com.septer.septerstudy.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.septer.septerstudy.service.IUserService;

@Controller
public class TestController {

	@Autowired
	IUserService userService;
	

	
	@RequestMapping("/user")
	public String users(Model model) {
		model.addAttribute("title","用户管理");
		model.addAttribute("users", userService.findAll());
		return "user";
	}

	@RequestMapping("/login")
	public String login(Model model) {
		return "login";
	}
	
	@RequestMapping(value="/logins",method=RequestMethod.POST)
	public String logins(String username, String password) {
		System.err.println("username: "+username+",password: "+password);
		AuthenticationToken token = new UsernamePasswordToken(username, password);
		SecurityUtils.getSubject().login(token);
		
		return "redirect:/user" ;
	}
	
	
	@RequestMapping("/logout")
	public String logout(Model model) {
		SecurityUtils.getSubject().logout();
		return "login";
	}
	
	
	
	
}
