##nodejs

####package.json

```java
{
  "name": "mongodbdemo",//项目名称
  "version": "0.0.0",//版本号
  "private": true,//是否是私有项目
  "scripts": {//脚本执行
    "start": "supervisor ./bin/www"//执行方式: node start == supervisor ./bin/www
  },
  "dependencies": {//第三方依赖包 安装方式: npm install angular --save
    "angular": "^1.6.4",
    "body-parser": "~1.17.1",
    "brew": "0.0.8",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.3",
    "ejs": "^2.5.6",
    "express": "~4.15.2",
    "jade": "~1.11.0",
    "mongojs": "^2.4.0",
    "morgan": "~1.8.1",
    "serve-favicon": "~2.4.2"
  },
  "devDependencies": {//开发环境第三方依赖包 安装方式: npm intall angular --save-dev
  }
}

安装所有dependencies下的依赖包: npm install --prod
安装所有devDependencies下的依赖包: npm install --only=dev
```