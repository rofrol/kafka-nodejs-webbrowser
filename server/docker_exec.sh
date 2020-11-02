#!/bin/bash

DIR="$(dirname "$0")"
cd $DIR

export $(cat ${DIR}/../.env | xargs)

docker exec -it ${DOCKER_CONTAINER} sh
