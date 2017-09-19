##dubbox使用说明

####POM
```xml
	<dependency>
		<groupId>com.alibaba</groupId>
		<artifactId>dubbo</artifactId>
		<version>${dubbox.version}</version>
	</dependency>
	<dependency>
		<groupId>org.apache.zookeeper</groupId>
		<artifactId>zookeeper</artifactId>
		<version>${zookeeper.version}</version>
	</dependency>
```

####XML 配置文件
```xml
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
		http://www.springframework.org/schema/beans/spring-beans.xsd
	http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd">

	<dubbo:application name="cme-consumer" owner="programmer"
		organization="dubbox" />

	<!--redis作为服务中心，username随便写，password写对 -->
	<!-- <dubbo:registry address="redis://10.0.4.235:6379" username="xxxx" password="12345678" 
		/> -->
	<!--zookeeper作为服务中心 -->
	<dubbo:registry address="zookeeper://${zookeeper}" />
	<dubbo:provider delay="-1" timeout="60000" retries="2"/>  

	<dubbo:protocol name="rest" port="9668" threads="500"
		contextpath="services" server="tomcat" accepts="500" host="${dubbox.host}" />

	<dubbo:protocol name="http" port="6889" host="${dubbox.host}" />
	<dubbo:protocol name="hessian" port="6890" host="${dubbox.host}" />
	<dubbo:protocol name="webservice" port="6892" host="${dubbox.host}" />
	<dubbo:protocol name="dubbo" port="6893" host="${dubbox.host}" />

</beans>

```

####WEB 拦截器
```xml
	<!--dubbox this listener must be defined before the spring listener -->
	<listener>
		<listener-class>com.alibaba.dubbo.remoting.http.servlet.BootstrapListener</listener-class>
	</listener>

	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>

	<servlet>
		<servlet-name>dispatcher</servlet-name>
		<servlet-class>com.alibaba.dubbo.remoting.http.servlet.DispatcherServlet</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>

	<servlet-mapping>
		<servlet-name>dispatcher</servlet-name>
		<url-pattern>/services/*</url-pattern>
	</servlet-mapping>

```

#### beans 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
	xmlns:mvc="http://www.springframework.org/schema/mvc" 
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="
	http://www.springframework.org/schema/beans 
	http://www.springframework.org/schema/beans/spring-beans.xsd
	http://code.alibabatech.com/schema/dubbo
	http://code.alibabatech.com/schema/dubbo/dubbo.xsd
	http://www.springframework.org/schema/context 
	http://www.springframework.org/schema/context/spring-context-4.1.xsd
	http://www.springframework.org/schema/mvc 
	http://www.springframework.org/schema/mvc/spring-mvc-4.1.xsd
	">
	
	<dubbo:service interface="com.cme.marketplan.restful.service.IRestService" ref="restService"  protocol="rest" />
</beans>
```

####Service
```java
@Service("circleRestfulService")
@Path("circle")
@Consumes({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
@Produces({ ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8 })
public class CircleRestfulService implements ICircleRestfulService {

	@Resource
	private BusinessAreaMapper businessAreaMapper;
	
	@Path("get-list")
	@GET
	@Override
	public ResponseData getList(@QueryParam("pf_id") String pf_id, @DefaultValue("1") 
								@QueryParam("pageNum") Integer pageNum,
								@DefaultValue("4") @QueryParam("pageSize") Integer pageSize) {
		ResponseData responseData = new ResponseData();
		Map<String, Object> queryMap = new HashMap<String, Object>();
		queryMap.put("pf_id", pf_id);
		queryMap.put("startRow", (pageNum - 1)*pageSize+1);
		queryMap.put("pageSize", (pageNum - 1)*pageSize + pageSize);
		List<BusinessArea> list = businessAreaMapper.getList(queryMap);
		if (list != null && list.size() >0) {
			responseData.setState(1);
			responseData.setMessage("返回成功");
			responseData.setData(list);
		}else{
			responseData.setState(0);
			responseData.setMessage("获取数据失败");
			responseData.setData(null);
		}
		
		return responseData;
	}
}

```
