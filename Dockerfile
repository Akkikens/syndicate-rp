FROM --platform=linux/amd64 ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl wget xz-utils jq \
    libatomic1 libc++-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/fivem

# Download latest recommended FiveM server artifact (build number + hash lookup)
RUN BUILD=$(curl -s "https://changelogs-live.fivem.net/api/changelog/versions/linux/server" | jq -r '.recommended') \
    && SLUG=$(curl -s "https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/" \
        | grep -oP "${BUILD}-[a-f0-9]+" | head -1) \
    && echo "Downloading FiveM artifact: ${SLUG}" \
    && wget -q "https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/${SLUG}/fx.tar.xz" \
        -O fx.tar.xz \
    && tar xf fx.tar.xz \
    && rm fx.tar.xz

WORKDIR /srv/syndicaterp

# Copy server data into container
COPY server-data/ .

EXPOSE 30120/tcp
EXPOSE 30120/udp
EXPOSE 40120/tcp

CMD ["/opt/fivem/run.sh", "+exec", "server.cfg"]
