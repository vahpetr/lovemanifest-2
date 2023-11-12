# Love Manifest 2

```sh
# build and publish
PLATFORM=linux/amd64 VERSION=1.0.121120232133 && \
docker build -f Dockerfile -t vahpetr/lovemanifest . --progress=plain --platform ${PLATFORM} && \
docker tag vahpetr/lovemanifest vahpetr/lovemanifest:${VERSION} && \
docker push vahpetr/lovemanifest:${VERSION}

# run
docker run --rm -it -p 8080:8080 -e NGINX_PORT=8080 vahpetr/lovemanifest
```