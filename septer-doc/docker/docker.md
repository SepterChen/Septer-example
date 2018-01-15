##docker


####docker-install

```
curl -fsSL https://get.docker.com/ | sh

chkconfig docker on #开机自启动服务
docker rm $(docker ps -a -q) 删除所有container
docker stop $(docker ps -a -q) 停止所有容器
docker rmi $(docker images | grep "^<none>" | awk "{print $3}") 删除所有id为<node>的image
docker rmi $(docker images -q) 删除所有image

```


```bash
	
	docker images
	docker pull
	docker search
	docker ps
	docker run
	docker stop
	docker exec 

```

```bash

	curl -L https://get.daocloud.io/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` 
	> /usr/local/bin/docker-compose

	chmod +x /usr/local/bin/docker-compose

	docker-compose
	docker-compose up -d
	docker-compose up --build
	docker-compose stop
	docker-compose logs

```


