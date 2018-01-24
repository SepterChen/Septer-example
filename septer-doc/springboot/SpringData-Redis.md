##SpringData-Redis.md



```properties
spring.redis.database=1  
spring.redis.host=127.0.0.1    
spring.redis.password= 
spring.redis.port=6379    
spring.redis.pool.max-idle=8  
spring.redis.pool.min-idle=0  
spring.redis.pool.max-active=8  
spring.redis.pool.max-wait=-1   
spring.redis.timeout=60000

```

```java

@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport{

	@Bean
	public CacheManager cacheManager(@SuppressWarnings("rawtypes") RedisTemplate redisTemplate) {
		RedisCacheManager cacheManager = new RedisCacheManager(redisTemplate);
		cacheManager.setDefaultExpiration(60);
		return cacheManager;
	}

}



@Cacheable(value="book:list") //单数据实体缓存
@Override
public List<Book> findAll(Pageable pageable) {
	return bookRepository.findAll();
}

@PersistenceContext
protected EntityManager em;

@Override
@Transactional
public void batchSave(List<Book> books) {
	for (int i = 0; i < books.size(); i++) {
		em.persist(books.get(i));
		if (i%50 == 0) {
			em.flush();
			em.clear();
		}
	}
		
}

```
