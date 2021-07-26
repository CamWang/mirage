#!/bin/sh

# A shell script for setting up Mirage production environment for Ubuntu 20.04 LTS Focal
# Notice: Use root privilige to run this script. E.p. sudo sh ./install.ubuntu.20.04.sh
# 一个用于设置Mirage在Ubuntu 20.04系统上生产环境的脚本，使用root权限运行该脚本
# Cam - 2021.7.24

# Apt Tsinghua Mirror. 设置APT的清华源。
echo "[MIRAGE] Setting up apt source list..."
sudo mv /etc/apt/sources.list /etc/apt/sources.list.bak
sudo touch /etc/apt/sources.list
echo "deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse" | sudo tee -a /etc/apt/sources.list
echo "deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse" | sudo tee -a /etc/apt/sources.list
echo "deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse" | sudo tee -a /etc/apt/sources.list
echo "deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse" | sudo tee -a /etc/apt/sources.list
sudo apt-get update
echo "[MIRAGE] Successfully set up apt source!"

# Install Node.js LTS. 安装Node.js的长时支持版
echo "[MIRAGE] Installing NodeJS..."
sudo apt-get install -y nodejs
node -v
echo "[MIRAGE] NodeJS Installed Successfully!"

# Install MongoDB 4.4. 安装MongoDB 4.4
echo "[MIRAGE] Installing MongoDB..."
sudo apt-get install -y gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $uver/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl enable mongod.service
sudo mkdir /data 
sudo mkdir /data/db
sudo service mongodb start
sudo service mongod status
mongo localhost:27017/admin mongo.setup.js
sed '/^#security:.*/a security:\n  authorization: enabled' /etc/mongod.conf | sudo tee /etc/mongod.conf
sudo service mongodb restart
# use 'mongo --authenticationDatabase "admin" -u "admin" -p' to login
echo "[MIRAGE] MongoDB Installed Successfully!"

# Install Mirage
echo "[MIRAGE] Installing Mirage..."
sudo useradd -d "/home/ubuntu" -m ubuntu
cd /home/ubuntu
git clone https://github.com/CamWang/mirage.git
cd /home/ubuntu/mirage/frontend
npm install
npm run build
cd /home/ubuntu/mirage/core
npm install
npm run build
cd /home/ubuntu/mirage/backend
npm install
npm run start
echo "[MIRAGE] Mirage Installed Successfully!"
