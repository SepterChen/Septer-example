##SpringBoot-Jpa

####JapRepository

```java

//BaseRepository
@NoRepositoryBean
public interface BaseRepository<T, ID extends Serializable> extends JpaRepository<T, Long>{
	
}
//UserRepository
public interface UserRepository extends BaseRepository<User, Long>, JpaSpecificationExecutor<User>{

	@Query(value = "select u from User u where u.name = ?1",nativeQuery = false)
	Page<User> findByName(String name, Pageable pageable);
	
}
//BookRepository
public interface BookRepository extends BaseRepository<Book, Long>{
	
	Book findByName(String name);
	
	@Query(value="select * from book b where b.name = ?1",nativeQuery = true)
	Book getBook(@Param("name") String name);
	
}
```

####JpaSpecificationExecutor&Specification

```java
public class UserSpecification implements Specification<User>{
	
	private Map<String, Object> queryMap;
	
	public UserSpecification(Map<String, Object> queryMap) {
		this.queryMap = queryMap;
	}
	
	@Override
	public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		
		Predicate p1 = builder.like(root.get("name").as(String.class), "%"+(String)queryMap.get("keyword")+"%");
		Predicate p2 = builder.lt(root.get("age").as(Integer.class), (Integer)queryMap.get("age"));

		return builder.and(p1,p2);
	}

}


```

####Controller

```java
@ResponseBody
@RequestMapping(value="/page/list")
public Page<User> pageList(HttpServletRequest request, 
							@RequestParam(value="page", required = false, defaultValue="0") int page,  
							@RequestParam(value="size" ,required = false, defaultValue="10") int size, 
							@RequestParam(value="keyword", required = false, defaultValue="") String keyword,
							@RequestParam(value="age", required =false, defaultValue="20") int age){
		
	Map<String, Object> queryMap = new HashMap<String, Object>();
	queryMap.put("keyword", keyword);
	queryMap.put("age", age);
		
	return userService.findByName(UserSpecification.searchUserByNameAndSortByAge(queryMap),
				new PageRequest(page, size));
}
```

####分页数据格式
```json
{
	"content": [{
		"id": 29,
		"name": "chenliang",
		"age": 18,
		"books": []
	}],
	"last": true,
	"totalPages": 1,
	"totalElements": 1,
	"number": 0,
	"size": 10,
	"sort": null,
	"numberOfElements": 1,
	"first": true
}


```

[Springboot-JPA官方文档](https://docs.spring.io/spring-data/jpa/docs/2.0.2.RELEASE/reference/html)