---
layout: post
title: ElasticSearch and Kibana setup with docker
date: 2022-12-21 18:30 +0545
categories: [Docker, elastic search]
tags: [Elastic search, docker, docker-compose]
---


[ElasticSearch](https://www.elastic.co/) is a full text search engine and [Kibana](https://www.elastic.co/kibana/) is a free and open user interface that lets you visualize your Elasticsearch data and navigate the Elastic Stack.

In this post we will see a summary of how we can configure both tools using docker and access them from the browser

### Docker setup

We will use [docker-compose](https://docs.docker.com/compose/) here to setup both tools, but you can also use docker cli to acheive it.

create a `docker-compose.yml` file or I like to call it `services.yml` file where we will setup all the configuration options for both services

```yml
version: '3.7'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.2.2
    container_name: elasticsearch
    restart: always
    environment:
      - xpack.security.enabled=false
      - discovery.type=single-node
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    cap_add:
      - IPC_LOCK
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
      - 9300:9300
  kibana:
    container_name: kibana_622
    image: docker.elastic.co/kibana/kibana:6.2.2
    restart: always
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - 5601:5601
    depends_on:
      - elasticsearch

volumes:
  elasticsearch-data:
    driver: local
```

### how to run it

```sh
docker-compose -f <filename.yml> up -d
```

And then visit http://localhost:5601 to see kibana dashbaord. Default password is `elastic`

- `-f` option allow us to provide file name if file is different than `docker-compose.yml`.
- `-d` option will run containers in deamon

### How to clean restart these docker instance

> IMPORTANT NOTE: below command will kill all processes and remove them. It will also remove all of the volume, so you will loose previous data

```sh
docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker-compose -f services.yml up -d
```

### How to fix test environment to use elastic search using chewy

Create `config/initializers/chewy.yml` file and add following

```ruby
Chewy.settings = { host: 'localhost:9200' }
```

Or change the port where your elastic search is running, if you had made any changes on above `services.yml` file
