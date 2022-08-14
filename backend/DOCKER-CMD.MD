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
8. docker logs [c-name] //to see logs

## volumes for development

-------------------------`for development process only`------------------------

1. docker run -v [pathToFolderLocation]:[pathToFolderContainer] -p 3000:5000 -d
   --name [c] [i] //to sync with local folder -v bind mode
2. //click the file and copy path:(/mnt/coding/whata-hot-burger/backend/)
   WORKDIR: /backend (it cant be only/) for container
3. file location variable: $(pwd)
4. docker run -v $(pwd):/backend -v /backend/node_modules -p 3:5 -d --name [c] [i]
   //avoid node_modules from overriding in -v
5. docker run -v $(pwd):/backend:ro -v /backend/node_modules -p 3:5 -d --name [c] [i]
   //:ro means read only -> container cannot change source file

---

## env variables --env NAME=VALUE --env-file ./.env

1. docker run -v $(pwd):/backend:ro -v /backend/node_modules --env PORT=4000 -p
   3000:4000 -d --name backend-c backend
2. printenv //from alpine to see all env variables
3. --env-file [./.env] //load env from file

## volumes

volume is used for data persistence

1. docker volume ls
2. docker volume prune //don't use it otherwise lose db data
3. docker rm [container-name] -fv //this will also delete the associate volume

## docker compose

is used for simplify of volumes command using a docker-compose.yml file

1. docker-compose up -d
2. docker-compose down -v //also delete the volume
3. docker-compose up -d --build //this fores a brand new build with new updates
4. docker-compose stop
5. docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
6. docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
7. just change .dev to .prod to build production build and --build for update changes
8. -V //use capital V after up to renew new npm packages

## database (mongodb)

1. docker exec -it [mongo-c-name] /bin/sh
2. mongo -u "fahim" -p "fahimkhan" //to connect mongo instance
3. db //to see databases
4. use whb_db //to create database
5. show dbs //show only those who has at least one document
6. db.[collection-name].insert({"name":"fahim"})
7. db.[collection-name].find()
8. docker exec -it [mongo-c] mongo -u "fahim" -p "fahimkhan" //quick way to get there
9. use docker volume prune after running useful container
10. docker inspect [c-name] //to get all info e.g networks info/ip networks -> ipAddress
11. we don't need the ip address we can use service name e.g. mongo (look at compose file)
12. docker logs [c-name] -f //like terminal logs

## nginx for load balancing and scaling

1. up -d -scale [service-name-node]=2 //will run 2 instances service-name e.g backend-app
2. one node instance run after another
