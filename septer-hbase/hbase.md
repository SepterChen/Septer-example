##HBase

####下载
```sh
wget http://labfile.oss.aliyuncs.com/hbase-0.98.11-hadoop2-bin.tar.gz

```

####解压
```sh
tar zxvf hbase-0.98.11-hadoop2-bin.tar.gz
mv hbase-0.98.11-hadoop2 hbase
```

####配置
```xml
cd hbase/conf
vim hbase-site.xml
<configuration>
	<property>
        <name>hbase.rootdir</name>
        <value>file:///tmp/hbase-${user.name}/hbase</value>
    </property>
</configuration>
vim hbase-env.sh
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.171-7.b10.el7.x86_64
export HBASE_MANAGES_ZK=true
```

####启动
```sh
./bin/start-hbase.sh
```

####操作
```sh
./bin/hbase shell
```



####附加
```sh
查看jdk路径
ls -l /usr/bin/java
ls -l /etc/alternatives/java
```
