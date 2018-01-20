package com.septer.septerstudy.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.session.SessionListener;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShiroConfiguration {

	@Bean
	public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager){
		ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
		shiroFilterFactoryBean.setSecurityManager(securityManager);
		
		Map<String, String> filterChainDefinitionMap = new LinkedHashMap<String, String>();
		
		filterChainDefinitionMap.put("/logins", "anon");
		filterChainDefinitionMap.put("/**", "authc");
		
		shiroFilterFactoryBean.setLoginUrl("/login");
		shiroFilterFactoryBean.setSuccessUrl("/user");
		
		shiroFilterFactoryBean.setUnauthorizedUrl("/err");
		
		shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
		
		
		
		
		
		
		return shiroFilterFactoryBean;
	}
	
	
	@Bean
	public SecurityManager securityManager(){
		DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
		
		MyRealm myRealm = new MyRealm();
		securityManager.setRealm(myRealm);
		
		securityManager.setSessionManager(sessionManager());
		securityManager.setCacheManager(ehCacheManager());
		
		return securityManager;
	}
	
	@Bean
	public SessionManager sessionManager(){
		DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
		
		Collection<SessionListener> listeners = new ArrayList<SessionListener>();
		
		listeners.add(new MySessionListener());
		
		sessionManager.setSessionListeners(listeners);
		return sessionManager;
	}
	
	@Bean
	public EhCacheManager ehCacheManager(){
		EhCacheManager ehCacheManager = new EhCacheManager();
		ehCacheManager.setCacheManagerConfigFile("classpath:ehcache.xml");
		return ehCacheManager;
	}
	
}
