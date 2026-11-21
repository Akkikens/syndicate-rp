FROM --platform=linux/amd64 ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# tzdata is required for the TZ env var (used by the weekly meet scheduler) to take effect.
RUN apt-get update && apt-get install -y \
    ca-certificates curl xz-utils jq tzdata \
    libatomic1 libc++-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/fivem

# Download the latest recommended FiveM server artifact.
# The artifact index redirects, so curl needs -L; the changelog API returns the
# full download URL in `.recommended_download`. Fail the build if it is empty.
RUN set -eu; \
    URL="$(curl -fsSL https://changelogs-live.fivem.net/api/changelog/versions/linux/server | jq -r '.recommended_download // empty')"; \
    if [ -z "$URL" ]; then echo "ERROR: could not resolve FiveM artifact URL" >&2; exit 1; fi; \
    echo "Downloading FiveM artifact: $URL"; \
    curl -fsSL "$URL" -o fx.tar.xz; \
    tar xf fx.tar.xz; \
    rm fx.tar.xz; \
    test -x /opt/fivem/run.sh

WORKDIR /srv/syndicaterp

# Copy server data into container (secrets are excluded via .dockerignore)
COPY server-data/ .

EXPOSE 30120/tcp
EXPOSE 30120/udp

# qbx_core refuses to start unless OneSync Infinity is enabled; it asks for
# `+set onesync on` on the command line.
CMD ["/opt/fivem/run.sh", "+set", "onesync", "on", "+exec", "server.cfg"]
