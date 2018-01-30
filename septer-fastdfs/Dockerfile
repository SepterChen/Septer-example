From centos

RUN mkdir -p /usr/servers/resources && cd /usr/servers/resources

RUN curl -o libfastcommon-master.zip  https://codeload.github.com/happyfish100/libfastcommon/zip/master&&curl -o fastdfs-master.zip https://codeload.github.com/happyfish100/fastdfs/zip/master&&curl -o fastdfs-nginx-module-master.zip https://codeload.github.com/happyfish100/fastdfs-nginx-module/zip/master&&curl -o nginx-1.12.2.tar.gz https://nginx.org/download/nginx-1.12.2.tar.gz

RUN yum install -y unzip zip  gcc-c++ && yum -y install pcre pcre-devel  && yum -y install zlib zlib-devel  && yum -y install openssl openssl-devel

RUN tar -zxvf nginx-1.12.2.tar.gz && cd nginx-1.12.2 && ./configure && make && make install

RUN ls
EXPOSE 8080

ENTRYPOINT ["/usr/local/nginx/sbin/nginx","-c","/usr/servers/resources/nginx-1.12.2/conf/nginx.conf"]

