##fastdfs+nginx图片服务器


####软件下载
```bash
//fastdfs基础安装软件
curl -o libfastcommon-master.zip  https://codeload.github.com/happyfish100/libfastcommon/zip/master

curl -o fastdfs-master.zip https://codeload.github.com/happyfish100/fastdfs/zip/master
//nginx-fastdfs-module插件
curl -o fastdfs-nginx-module-master.zip https://codeload.github.com/happyfish100/fastdfs-nginx-module/zip/master
//nginx
curl -o nginx-1.12.2.tar.gz https://nginx.org/download/nginx-1.12.2.tar.gz

```
####软件安装
>安装编译器软件
```bash
	yum install unzip zip  gcc-c++
	yum -y install pcre pcre-devel  
	yum -y install zlib zlib-devel  
	yum -y install openssl openssl-devel
```

>安装libfastcommon-master
```bash
	unzip libfastcommon-master.zip 
	cd libfastcommon-master
	./make.sh 
	./make.sh install
	ln -s /usr/lib64/libfastcommon.so /usr/local/lib/libfastcommon.so
	ln -s /usr/lib64/libfdfsclient.so /usr/local/lib/libfdfsclient.so
	ln -s /usr/lib64/libfdfsclient.so /usr/lib/libfdfsclient.so
```

>安装fastdfs-master:tracker
```bash
	unzip fastdfs-master.zip 
	cd fastdfs-master
	./make.sh 
	./make.sh install
	cd /etc/fdfs/
	cp client.conf.sample client.conf
	cp storage.conf.sample storage.conf
	cp storage_ids.conf.sample storage_ids.conf
	cp tracker.conf.sample tracker.conf
	mkdir /opt/fastdfs_tracker
	vim tracker.conf
	ln -s /usr/bin/fdfs_trackerd  /usr/local/bin
	ln -s /usr/bin/stop.sh  /usr/local/bin
	ln -s /usr/bin/restart.sh  /usr/local/bin
	service fdfs_trackerd start
	netstat -unltp|grep fdfs
```

>安装fastdfs-master:storge
```bash
	mkdir /opt/fastdfs_storage
	mkdir /opt/fastdfs_storage_data
	vim storage.conf
	ln -s /usr/bin/fdfs_storaged /usr/local/bin
	service fdfs_storaged start
	netstat -unltp|grep fdfs
```

>
```bash
	tar -zxvf nginx-1.12.2.tar.gz 
	./configure 
	make
	make install
```

>安装nginx-fastdfs-module
```bash
	unzip fastdfs-nginx-module-master.zip 
	./configure --prefix=/usr/local/nginx --add-module=/usr/servers/resources/fastdfs-nginx-module-master/src/
	make
	make install
	vim nginx.conf 
	/usr/local/nginx/sbin/nginx
	cp /usr/servers/resources/fastdfs-master/conf/http.conf /etc/fdfs/
	cp /usr/servers/resources/fastdfs-master/conf/mime.types /etc/fdfs/
	cp /usr/servers/resources/fastdfs-nginx-module-master/src/mod_fastdfs.conf /etc/fdfs/
	vim mod_fastdfs.conf 
	/usr/local/nginx/sbin/nginx -c /usr/servers/resources/nginx-1.12.2/conf/nginx.conf 
```

