#!/bin/bash

sudo apt-get install build-essential git openjdk-7-jdk maven curl
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
sudo curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-debian71-3.0.3.tgz
tar -zxvf mongodb-linux-x86_64-debian71-3.0.3.tgz
sudo mkdir --parents /data/db
sudo mongodb-linux-x86_64-debian71-3.0.3/bin/mongod --dbpath=/data/db &
git clone https://Svjard@bitbucket.org/Svjard/t2mongo.git
cd t2mongo
/usr/lib/jvm/java-7-openjdk-amd64/bin/javac -cp .:./jars/* DataGenerator.java
/usr/lib/jvm/java-7-openjdk-amd64/bin/java -cp .:./jars/* DataGenerator
mvn clean install
mkdir ~/local
npm install 
npm install -g bower
npm install -g grunt-cli
/home/mongo/local/bin/bower install
/home/mongo/local/bin/grunt build
node index.js &
/usr/lib/jvm/java-7-openjdk-amd64/bin/java -jar target/t2mongo-1.0-SNAPSHOT.jar