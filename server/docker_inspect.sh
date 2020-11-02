#!/bin/bash

# https://ryandaniels.ca/blog/find-version-tag-latest-docker-image/
IMAGE_ID="$1"
docker image inspect --format '{{json .}}' "$IMAGE_ID" | jq -r '. | {Id: .Id, Digest: .Digest, RepoDigests: .RepoDigests, Labels: .Config.Labels}'
