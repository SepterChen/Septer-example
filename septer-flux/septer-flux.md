##septer-flux

```java
@Configuration
public class CommonConfiguration {
	
	@Bean
	@Autowired
	public RouterFunction<ServerResponse> test(UserHandler handler) {
		return RouterFunctions.route(RequestPredicates.GET("/test/index"), ss -> {
			List<User> users = new ArrayList<User>();
			User user = null;
			for (int i = 0; i < 10; i++) {
				user = new User();
				user.setId(String.valueOf(i));
				user.setName("chenliang"+i);
				user.setAge(i+10);
				users.add(user);
			}
			Flux<User> fluxUsers = Flux.fromIterable(users);
			return ServerResponse.ok().body(fluxUsers, User.class);
		}).andRoute(RequestPredicates.GET("/user/list/{name}"), user -> handler.getUserList(user.pathVariable("name")))
				.andRoute(RequestPredicates.GET("/user/search"), userSerach -> {
					System.err.println(userSerach.queryParam("name").get());
					List<User> users = new ArrayList<User>();
					User user = null;
					for (int i = 0; i < 10; i++) {
						user = new User();
						user.setId(String.valueOf(i));
						user.setName("chenliang"+i);
						user.setAge(i+10);
						users.add(user);
					}
					Flux<User> fluxUsers = Flux.fromIterable(users);
					return ServerResponse.ok().body(fluxUsers, User.class);
				});
	}
	
}
```

```java

@Component
public class UserHandler {

	
	public Mono<ServerResponse> getUserList(String name){
		System.err.println(name);
		
		User user = new User();
		user.setId("12");
		user.setName("chenliang");
		user.setAge(10);
		Mono<User> userMono = Mono.just(user);
		return  ServerResponse.ok().body(userMono, User.class);
		
	}
}



```