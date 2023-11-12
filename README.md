# Love Manifest 2

```sh
PLATFORM=linux/amd64 VERSION=1.0.121120231535 && \
docker build -f Dockerfile -t vahpetr/lovemanifest . --progress=plain --platform ${PLATFORM} && \
docker tag vahpetr/lovemanifest vahpetr/lovemanifest:${VERSION} && \
docker push vahpetr/lovemanifest:${VERSION}
```