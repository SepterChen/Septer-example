##SpringBoot-Thymeleaf

>####application.properties

```properties

# THYMELEAF (ThymeleafAutoConfiguration)  
spring.thymeleaf.prefix=classpath:/templates/  
spring.thymeleaf.suffix=.html  
spring.thymeleaf.mode=HTML5  
spring.thymeleaf.encoding=UTF-8  
spring.thymeleaf.content-type=text/html # ;charset=<encoding> is added  
spring.thymeleaf.cache=true # set to false for hot refresh  

```

>####controller

```java

@Controller
public class TestController {

	@RequestMapping("/hello")
	public String index(Model model) {
		model.addAttribute("name", "chenliang");
		model.addAttribute("pageString", "<nav><ul><li><a>首页</a></li><li><a>首页</a></li></ul></nav>");
		model.addAttribute("templateName", "user/list");
		model.addAttribute("templateSelction", "head");
		model.addAttribute("title","用户管理");
		return "hello";
	}

}

```

>####html

```html
<!DOCTYPE html>
<html>
<head>
	<title>Thymeleaf-测试样例</title>
	<meta charset="utf-8"></meta>
</head>
<body>

<p th:text="${name}"></p>
<div th:utext="${pageString}"></div>
<div th:include="(${templateName}) :: (${templateSelction})"></div>


</body>
</html>

```


