#!/bin/sh
VAR=$1

case $VAR in
    "workshop")
        docker build . --no-cache --file Dockerfile -t naortedgi/workshop:latest
        docker push naortedgi/workshop:latest
        ;;

    "not-working")
        docker build . --no-cache --file Dockerfile-not-working -t naortedgi/workshop:not-working
        docker push naortedgi/workshop:not-working
        ;;

    *)
        echo "Usage: $0 {workshop|not-working}"
        exit 1
        ;;
esac