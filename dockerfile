# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #


#| Nix Development Builder
FROM nixos/nix:latest AS development-builder

COPY ./flake.nix /tmp/build/flake.nix
COPY ./flake.lock /tmp/build/flake.lock
WORKDIR /tmp/build
RUN nix --extra-experimental-features "nix-command flakes" --option filter-syscalls false build ".#dev-bundle"
RUN mkdir /tmp/nix-store-closure
RUN cp -R $(nix-store --query --requisites result/) /tmp/nix-store-closure


#| Development image running on nodemon
FROM scratch AS development
ENV PATH="/bin"
COPY --from=development-builder /tmp/nix-store-closure /nix/store
COPY --from=development-builder /tmp/build/result/bin /bin


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #


#| Nix Production Builder
FROM nixos/nix:latest AS production-builder

COPY . /tmp/build/
WORKDIR /tmp/build
ARG module
RUN nix --extra-experimental-features "nix-command flakes" --option filter-syscalls false build ".#${module}-bin"
RUN mkdir /tmp/nix-store-closure
RUN cp -R $(nix-store --query --requisites result/) /tmp/nix-store-closure


#| Production image running on node
FROM scratch AS production
COPY --from=production-builder /tmp/nix-store-closure /nix/store
COPY --from=production-builder /tmp/build/result/bin /bin


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #
