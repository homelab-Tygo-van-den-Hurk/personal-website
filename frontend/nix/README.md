> This directory is used to store the [packages](./packages/) that nix will build.

[< Back to module README](../README.md)

# Nix Packages (Frontend)

The purpose of this folder is that the flake as an API with this module of the repository. All this module has to do is produce a [lib](./packages/lib/default.nix), [bin](./packages/bin/default.nix) and [docker image](./packages/docker/default.nix) with the respective [packages](./packages/). The module is allowed to have a completely different structure from the rest of the modules, as long as it respects the API and build the requested packages as required.
