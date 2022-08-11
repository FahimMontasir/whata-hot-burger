# All docker commands

## images

1. docker build .
2. docker image ls
3. docker image rm [image-id]
4. docker build -t backend . //create with name

## containers

1. docker run -d --name [container-name] [image-name]
2. docker ps -a //show -a all container
3. docker rm [container-name] -f //remove running container by -force
4. docker run -p 3000[incoming-localhost:3000]:5000[outgoing-port] -d --name [c] [i]
5. docker exec -it [container-name] /bin/sh //to see file system
6. ls //list all the files
7. exit
