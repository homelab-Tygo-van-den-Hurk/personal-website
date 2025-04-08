# Nix builder
FROM nixos/nix:latest AS builder

COPY . /tmp/build/
WORKDIR /tmp/build
ARG module
RUN nix \
    --extra-experimental-features "nix-command flakes" \
    --option filter-syscalls false \
    build ".#${module}-bin"

RUN mkdir /tmp/nix-store-closure
RUN cp -R $(nix-store --query --requisites result/) /tmp/nix-store-closure


# Development image running on nodemon
FROM scratch AS development
WORKDIR /src
COPY --from=builder /tmp/nix-store-closure /nix/store
COPY --from=builder /tmp/build/result/bin /bin


# Production image running on node
FROM scratch AS production
WORKDIR /src
COPY --from=builder /tmp/nix-store-closure /nix/store
COPY --from=builder /tmp/build/result/bin /bin
