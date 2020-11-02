#!/bin/bash

DIR="$(dirname "$0")"
cd $DIR

export $(cat ${DIR}/../.env | xargs)

# https://stackoverflow.com/questions/38576337/how-to-execute-a-bash-command-only-if-a-docker-container-with-a-given-name-does/38576401#38576401
if [ ! -z "$(docker ps -q -f name=${DOCKER_CONTAINER})" ]; then
    docker stop ${DOCKER_CONTAINER}
fi

if [ "$(docker ps -aq -f status=exited -f name=${DOCKER_CONTAINER})" ]; then
    docker rm ${DOCKER_CONTAINER}
fi

docker run -p 8080:8080 -e RTDMURL='http://host.docker.internal:4000' -e CLOUDKARAFKA=true --name ${DOCKER_CONTAINER} ${DOCKER_IMAGE}
