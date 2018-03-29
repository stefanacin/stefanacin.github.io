---
layout: post
title:  "Docker Tutorial"
date:   2017-06-15 14:01:32 +0200
categories: docker
---

In .dockerignore add:
node_modules
npm-debug.log

{% highlight bash %}
# Build Image (the username/ is not directly connected to docker hub, we can call it whatever we want)
sudo docker build -t sa/kubyu .

# List images
docker images

# Remove Image
docker rmi #id

$ docker run -p 49160:8080 -d sa/kubyu

# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080

# Enter the container (/bin/sh for alpine)
$ docker exec -it <container id> /bin/bash

docker ps and docker ps -a

# Check connection
curl -i localhost:49160
{% endhighlight %}
