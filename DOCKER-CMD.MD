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

## Push to production

1. create a droplet in digital ocean
2. copy droplet ip goto terminal
3. ssh root@ipaddress and give password
4. you get assess in the terminal
5. to install docker go to https://get.docker.com/
6. curl -fsSL https://get.docker.com -o get-docker.sh
7. sh get-docker.sh
8. docker --v
9. to install docker-compose search https://docs.docker.com/compose/install/compose-plugin/#install-using-the-repository

---

10. setup git
11. setup env variable e.g. MONGO_INITDB_ROOT_PASSWORD
12. export MONGO_INITDB_ROOT_PASSWORD="fahimkhan"
13. mkdir app
14. cd app
15. hard way to push code (git pull - git push)
16. git clone repolink and pull
17. docker-compose -f [n] -f [n] up -d --build --no-deps [service-name]//to update specific service
18. developer workflow => push -> pull -> docker-compose up --build //not best workflow
19. best workflow => push image to docker hub -> pull image in prod server -> d-c up

## best workflow = build [s] -> push [s] -> pull [s] -> up -d --no-deps [s]

1. create repo in docker hub
2. docker image -tag [i-name] username/reponame //change the image name to push d hub
3. docker push [i-name]
4. git push all and pull in prod server
5. d-c up //to get all changes from d-c file
6. docker-compose -f [.yml] -f [.prod.yml] build [service-name]
7. d-c -f -f push [service-name] //we can omit service name to push all services
8. docker-compose -f [.yml] -f [.prod.yml] pull

## automated workflow with docker watchtower

1. docker run -d --name watchtower -e WATCHTOWER_TRACE=true WATCHTOWER_POLL_INTERVAL=50
   -v /var/run/docker.sock:/var/run/docker.sock containerrr/watchtower [containr-name]
2. docker logs watchtower -f
3. in dev server -> build -> push -> automatically pulled in prod

## orchestration with docker swarm

1. docker-compose vs docker swarm
2. container = node
3. docker swarm init --advertise-addr [public-ip]
4. learn docker swarm
5. docker stack deploy -c [.yml] -c [.prod.yml] [give-stack-name]
6. docker node ls
7. docker stack ls
8. done
