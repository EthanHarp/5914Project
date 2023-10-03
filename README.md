# 5914Project
A future Ai generated project

### WSL Docker Instructions
1.  Install Docker Compose:
```
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
 mkdir -p $DOCKER_CONFIG/cli-plugins
 curl -SL https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
```
then:
```
 chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```

2. Start Daemon with:
```
sudo dockerd
```

3. Open new terminal window
```
cd django_react_project
```

5. Finally run:
```
docker compose up
```
** if error try deleteing the line with credsStore from ~/.docker/config.json
