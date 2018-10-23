##*SpringBoot-Redis*

####xml
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

####application.properties
```properties
spring.redis.database=1  
spring.redis.host=127.0.0.1  
spring.redis.password=
spring.redis.port=6379  
spring.redis.pool.max-idle=8  
spring.redis.pool.min-idle=0  
spring.redis.pool.max-active=8  
spring.redis.pool.max-wait=-1  
#spring.redis.sentinel.master=  
#spring.redis.sentinel.nodes=  
spring.redis.timeout=60000  
```

####java-configuration

```java

@Configuration
@EnableCaching
public class RedisConfig {
	
	

	@Bean
	public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
		RedisCacheManager cacheManager = RedisCacheManager.create(connectionFactory);
		return cacheManager;
	}
	
	@Bean
	public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory){
		RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(factory);
		
		
		// 使用Jackson2JsonRedisSerialize 替换默认序列化
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = 
        			new Jackson2JsonRedisSerializer<>(Object.class);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);

        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        // 设置value的序列化规则和 key的序列化规则
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.afterPropertiesSet();
		
		
		
		return redisTemplate;
	}
	
	
	
}


```

####java

```java
@RestController
@RequestMapping("api/redis")
public class RedisController {

	
	
	@Autowired 
	RedisTemplate<String, Object> redisTemplate;
	
	@Autowired
	StringRedisTemplate stringRedisTemplate;
	
	@RequestMapping("test")
	public Object test(){
		
		SysUser user = new SysUser();
		user.setId(UUID.randomUUID().toString().replaceAll("-", ""));
		user.setName("chenliang");
		user.setAddress("1234567");
		user.setAge(10);
//		redisTemplate.opsForValue().set("111111111", user);
//		redisTemplate.opsForValue().get("111111111");
		redisTemplate.opsForHash().put("user1111111", user.getId(), user);
		SysUser user2 = (SysUser)redisTemplate.opsForHash().get("user1111111", user.getId());
		
		return user2;
		
	}
	
	@RequestMapping("test/string")
	public Object testString(){
		
		stringRedisTemplate.opsForValue().set("my name", "chenliang");
		return stringRedisTemplate.opsForValue().get("my name");
		
	}
	
	
	@RequestMapping("test/object")
	public Object testObject(){
		
		SysUser user = new SysUser();
		user.setId(UUID.randomUUID().toString().replaceAll("-", ""));
		user.setName("chenliang");
		user.setAddress("1234567");
		user.setAge(10);
		redisTemplate.opsForValue().set("111111111", user);
//		redisTemplate.opsForValue().get("111111111");
		//redisTemplate.opsForHash().put("user1111111", user.getId(), user);
		SysUser user2 = (SysUser)redisTemplate.opsForValue().get("111111111");
		
		return user2;
		
	}
	
}


@Cacheable(value="user",key="#userId")
@Override
public SysUser findById(String userId) {	
	return userMapper.findById(userId);
}
```