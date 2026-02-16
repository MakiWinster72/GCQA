## Docker

### 设备要求

|      |                                                |                                                  |
| ---- | ---------------------------------------------- | ------------------------------------------------ |
|      | 最低要求                                       | 建议配置                                         |
| CPU  | 2 核 2GHz 或 ≥ Intel i3 2 代 或 ≥ Ryzen 3-3xxx | 2 核 2.5GHz 或 ≥ Intel i3 3 代 或 ≥ Ryzen 3-3xxx |
| 内存 | ≥ 2 GB                                         | ≥ 2 GB                                           |
| 磁盘 | ≥ 3 GB                                         | /                                                |

**操作系统：推荐 Linux**_**（或 Windows 使用 Docker Desktop）**_

### 安装 Docker composer

> 下以 Ubuntu 为例，其他发行版更换对应的包管理器即可

#### 1. 卸载老版本 Docker

```Bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

#### 2. 更新软件包

```Bash
sudo apt-get update
sudo apt-get upgrade
```

#### 3. 安装 Docker 依赖

```Bash
sudo apt-get install ca-certificates curl gnupg lsb-release
```

#### 4. 添加 Docker GPG 密钥

```Bash
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```

#### 5. 添加阿里云 Docker 软件源

> 若没有网络问题，可直接使用官方源

```Bash
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```

#### 6. 安装 Docker

```Bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

#### 7. 配置用户组

允许当前用户执行 Docker 命令无需 sudo：

```Bash
sudo usermod -aG docker $USER
```

重启后生效。

```Bash
sudo reboot
```

#### 8. 查看 Docker 版本

```Bash
sudo docker version
```

若有输出版本号等，则安装成功。

### 配置 docker 代理

> 若没有 docker 的网络连接问题，可直接到下一步

1. 安装帮助脚本：

```Bash
sudo bash -c "$(curl -sSL https://n3.ink/helper)"
```

2. 注册并生成授权码：

   3. 注册账号：[https://1ms.run](https://1ms.run/)
   4. 生成授权码：[https://1ms.run/user?menu=10](https://1ms.run/user?menu=10)
   5. 回到 Linux 输入完成授权

### 安装 Apache Anwser

1. 新建文件夹并创建 docker-composer.yaml

```YAML
services:
  answer:
    image: apache/answer
    ports:
      - "9080:80"   # TODO: 这里配置端口映射
    restart: no
    volumes:
      - answer-data:/data
    depends_on:
      - mysql

  mysql:   # 应用内也可配置使用宿主机的数据库或连接其他主机数据库
    image: mysql
    restart: no
    environment:   # TODO: 数据库信息
      - MYSQL_ROOT_PASSWORD=answerpswd
      - MYSQL_DATABASE=answerdb
      - MYSQL_USER=answer
      - MYSQL_PASSWORD=answerpswd
    volumes:
      - mysql-data:/var/lib/mysql
    ports:
      - "3307:3306"  # TODO: 数据库的端口映射

volumes:
  answer-data:
  mysql-data:
```

2. 启动容器

```Bash
docker compose up -d
```

接下来能看到拉取镜像，等待下载后会自动启动。

[初始化 Apache Answer](初始化.md)