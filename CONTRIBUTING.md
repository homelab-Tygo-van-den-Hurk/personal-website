> In here we describe how to contribute, and the guidelines we set.

[< Back to main README...](./README.md) 

- [How to Develop](#how-to-develop)
  - [Compiling Typescript](#compiling-typescript)
  - [Building the docker image](#building-the-docker-image)
    - [Loading the docker image](#loading-the-docker-image)
    - [Using `docker compose`](#using-docker-compose)
  - [Doing stuff manually](#doing-stuff-manually)
  - [Continuous Integration \& Continuous Delivery (CI/CD)](#continuous-integration--continuous-delivery-cicd)
  - [External Resources](#external-resources)

# How to Develop

There are several actions you might want to perform. Such as: [compile the TypeScript code](#compiling-typescript), [build the docker image](#building-the-docker-image), or [do some manual development](#doing-stuff-manually). For that we'll use [nix](https://nixos.org/) and its build scripts. So all you have to do, is run the command, and then it should just do everything for you, downloading dependencies, and doing tests. First of all, make sure you have `nix` installed. Check by running:

```BASH
nix --version
```

Make sure that `nix` is above version `2.16.0`, otherwise I cannot guarantee that this will work. There is a devcontainer for those who are can't or don't have `nix` installed. Look at the documentation for your IDE on how to work with devcontainers. 

## Compiling Typescript

To compile the Typescript code we take in the required files and ask `tsc` to compile it for us. To do this we run one of the following commands:

```BASH
nix build .#backend-npm-package
nix build .#frontend-npm-package
nix build .#redirects-npm-package
```

Depending on the module you're compiling for. You should have a symlink `result` directory with the result in there. You can of course also manually compile the binary, to do this we first run:

```BASH
nix develop
```

This should drop you in a shell with `tsc`, `node`, `npm` etc installed. Since these are also the exact same version as the ones used to [build the docker image](#building-the-docker-image), or compiling the code everything will work.

## Building the docker image

To build the docker images we again use nix. For that we have the following commands:

```BASH
nix build .#backend-docker-image
nix build .#frontend-docker-image
nix build .#redirects-docker-image
```

This will make a result file unlike [compiling the typescript code](#compiling-typescript) this way. This result file is a docker image. You can just load that into docker, and then use it as normal.

### Loading the docker image

To load the newly created image into docker we use the `docker load` command:

```BASH
docker load < ./result
```

where result is the file Nix created.

### Using `docker compose`

There is also a docker compose file available that uses nix and the same packages as the rest of the project uses to make minimalistic dev images. To make the production images run the following:

```BASH
docker compose --file ./docker-compose.yml up --force-recreate --build --detach
```

There are also dev images available in the [`dockerfile`](./dockerfile), simply run the following command to use those instead and change the environment to dev mode:

```BASH
docker compose --file ./docker-compose.yml --file ./docker-compose.dev.yml up --force-recreate --build --abort-on-container-exit
```

There are some environment variables you might want to change, that being the urls of the services. See the docker compose files for more information.

## Doing stuff manually

In case you need access to `tsc`, `node`, `nodemon`, `npm` or anything else you can run:

```BASH
nix develop
```

This should drop you in a shell with all the required programs installed!

## Continuous Integration & Continuous Delivery (CI/CD) 

We make use of continuous integration, so when you push on, or create a pull request for `main` it will run the checks from [the flake](./flake.nix) and tell you if there are any problems. If there are it will tell you the actions or workflows are failing. Until you fix this, you cannot merge into `main`. This makes sure that `main` is always working!

You can test these checks yourself using `nix`, or GitHub's `act`. To check using nix, run:

```BASH 
nix flake check --all-systems 
```

To run/test the GitHub actions locally run:

```BASH
act --platform ubuntu-24.04=catthehacker/ubuntu:act-latest
```

The platform flag shouldn't be needed, however thats what worked for me. Try running it with or without the tag to see what works for you. You shouldn't have to run this often though, only when changing or adding GitHub workflows. 

## External Resources

There are several resources on building docker images with nix. Here are a few:

| description                                                  | Link                                                                    |
| ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| A guide on how to make containers using nix and docker files | https://mitchellh.com/writing/nix-with-dockerfiles                      |
| Documentation on how to build docker images using nix        | https://nix.dev/tutorials/nixos/building-and-running-docker-images.html |
| The official nix wiki on docker and building with docker      | https://nixos.wiki/wiki/Docker                                          |
