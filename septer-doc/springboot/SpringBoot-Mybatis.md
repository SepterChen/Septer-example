##SpringBoot-Mybatis


####POM

```xml
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid</artifactId>
			<version>1.1.0</version>
		</dependency>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
		</dependency>
		<!--mybatis -->
		<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
			<version>1.3.1</version>
		</dependency>
		<!--mapper -->
		<dependency>
			<groupId>tk.mybatis</groupId>
			<artifactId>mapper-spring-boot-starter</artifactId>
			<version>1.2.4</version>
		</dependency>
		<!--pagehelper -->
		<dependency>
			<groupId>com.github.pagehelper</groupId>
			<artifactId>pagehelper-spring-boot-starter</artifactId>
			<version>1.2.3</version>
		</dependency>

		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid-spring-boot-starter</artifactId>
			<version>1.1.9</version>
		</dependency>

		<dependency>
			<groupId>org.mybatis.generator</groupId>
			<artifactId>mybatis-generator-core</artifactId>
			<version>1.3.2</version>
			<scope>compile</scope>
			<optional>true</optional>
		</dependency>
```

####application.properties
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/leecx
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.druid.initial-size=1
spring.datasource.druid.min-idle=1
spring.datasource.druid.max-active=20
spring.datasource.druid.test-on-borrow=true
spring.datasource.druid.stat-view-servlet.allow=true


# mybatis \u914d\u7f6e
mybatis.type-aliases-package=com.septer.webflux.domain
mybatis.mapper-locations=classpath:mapper/*.xml
# \u901a\u7528 Mapper \u914d\u7f6e
mapper.mappers=com.speter.webflux.util.MyMapper
mapper.not-empty=false
mapper.identity=MYSQL
# \u5206\u9875\u63d2\u4ef6\u914d\u7f6e
pagehelper.helperDialect=mysql
pagehelper.reasonable=true
pagehelper.supportMethodsArguments=true
pagehelper.params=count=countSql

```

####SpringBootApplication.java
```java
@SpringBootApplication
//配置mapper扫描包
@MapperScan(value="com.speter.webflux.mapper")
public class WebFluxApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebFluxApplication.class, args);
	}
}

```

####generatorConfig.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <context id="MysqlContext" targetRuntime="MyBatis3Simple" defaultModelType="flat">
        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>

        <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
            <property name="mappers" value="com.speter.webflux.util.MyMapper"/>
        </plugin>

        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/leecx"
                        userId="root"
                        password="">
        </jdbcConnection>

        <!-- 对于生成的pojo所在包 -->
        <javaModelGenerator targetPackage="com.speter.webflux.domain" targetProject="src/main/java"/>

		<!-- 对于生成的mapper所在目录 -->
        <sqlMapGenerator targetPackage="mapper" targetProject="src/main/resources"/>

		<!-- 配置mapper对应的java映射 -->
        <javaClientGenerator targetPackage="com.speter.webflux.mapper" targetProject="src/main/java"
                             type="XMLMAPPER"/>


		<table tableName="sys_user"></table>
		 
    </context>
</generatorConfiguration>
```

###分页
```java
PageHelper.startPage(1, 3);

```