package com.septer.septerstudy.config;

import java.util.HashSet;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyRealm extends AuthorizingRealm{

	private final static Logger logger = LoggerFactory.getLogger(MyRealm.class);
	
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
		logger.debug("--------------------");
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		//TODO 授权操作
		info.setStringPermissions(new HashSet<String>());
		return info;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken arg0) throws AuthenticationException {
		logger.debug("登录操作进行登录认证......");
		UsernamePasswordToken token = (UsernamePasswordToken) arg0;
		
		String username = token.getUsername();
		
		
		SimpleAuthenticationInfo info = new SimpleAuthenticationInfo("chenliang","123456",getName());
		
		return info;
	}

	
	
	
}
