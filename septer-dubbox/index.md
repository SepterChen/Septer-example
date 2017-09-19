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