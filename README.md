> This repository is used to construct my personal websites. This includes the frontend, backend, assets and redirect server.


<br>
<div align="center">
    <a href="https://nixos.org">
        <img src="https://img.shields.io/badge/Built_With-Nix-5277C3.svg?style=flat&logo=nixos" alt="Built with Nix"/>
    </a>
    <a href="https://www.docker.com">
        <img src="https://img.shields.io/badge/Built_With-Docker-0290E6.svg?logo=docker&labelColor=#0290E6" alt="Built with Docker"/>
    </a>
    <a href="https://containers.dev/">
        <img src="https://img.shields.io/badge/devcontainer-provided-green?style=flat" alt="devcontainer provided"/>
    </a>
    <!--~ Repository CI/CD ~-->
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/actions/workflows/deploy-github-pages.yml">
        <img src="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/workflows/Deploy%20GitHub%20Pages/badge.svg?style=flat" alt="GitHub deployment status" />
    </a>
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/actions/workflows/dependabot-automerge.yml">
        <img src="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/workflows/Dependabot%20Automerge/badge.svg?style=flat" alt="GitHub dependabot automerge status" />
    </a>
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/actions/workflows/nix-flake-checks.yml">
        <img src="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/workflows/Nix%20Flake%20Checks/badge.svg?style=flat" alt="Nix flake Check status" />
    </a>
    <!--~ Repository Statistics ~-->
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/homelab-Tygo-van-den-Hurk/personal-websites?style=flat" alt="Contributors"/>
    </a>
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/homelab-Tygo-van-den-Hurk/personal-websites?style=flat" alt="The Eclipse Public License v2.0 badge" />
    </a>
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/commit">
        <img src="https://badgen.net/github/commits/homelab-Tygo-van-den-Hurk/personal-websites?style=flat" alt="GitHub commits" />
    </a>
     <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/commit">
        <img src="https://badgen.net/github/last-commit/homelab-Tygo-van-den-Hurk/personal-websites?style=flat" alt="GitHub latest commit" />
    </a>
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/network/">
        <img src="https://badgen.net/github/forks/homelab-Tygo-van-den-Hurk/personal-websites?style=flat" alt="GitHub forks" />
    </a>
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/">
        <img src="https://img.shields.io/github/languages/count/homelab-Tygo-van-den-Hurk/personal-websites?style=flat" alt="amount of languages in the repository" />
    </a>   
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/stargazers">
        <img src="https://img.shields.io/github/stars/homelab-Tygo-van-den-Hurk/personal-websites?style=flat" alt="amount of stars" />
    </a>
    <!--~ Repository Updates ~-->
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/pulse">
        <img src="https://img.shields.io/github/created-at/homelab-Tygo-van-den-Hurk/personal-websites?style=flat" alt="created at badge" />
    </a>
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/release">
        <img src="https://img.shields.io/github/release/homelab-Tygo-van-den-Hurk/personal-websites?style=flat&display_name=release" alt="newest release" />
    </a>
    <a href="https://github.com/homelab-Tygo-van-den-Hurk/personal-websites/">
        <img src="https://img.shields.io/github/repo-size/homelab-Tygo-van-den-Hurk/personal-websites?style=flat" alt="the size of the repository" />
    </a>   
</div>
<br>

# Personal Website

- [Personal Website](#personal-website)
  - [Overview](#overview)
  - [How do Develop](#how-do-develop)
  - [Running in Production](#running-in-production)

## Overview 

I own the [`hurk.dev`](https://hurk.dev) domain, and this repository holds the source code for my personal websites, such as [`tygo.van.den.hurk.dev`](https://tygo.van.den.hurk.dev/). The repository consists of 4 submodules:

- [the asset server](./assets/README.md) hosted at [`assets.tygo.van.den.hurk.dev`](https://assets.tygo.van.den.hurk.dev/);
- [the frontend server](./frontend/README.md) hosted at [`tygo.van.den.hurk.dev`](https://tygo.van.den.hurk.dev/);
- [the backend server](./backend/README.md) hosted at [`api.tygo.van.den.hurk.dev`](https://api.tygo.van.den.hurk.dev/);
- [the redirection server](./redirection/README.md) hosted at [`redirects.tygo.van.den.hurk.dev`](https://redirects.tygo.van.den.hurk.dev/).

## How do Develop

To get the containers up and running in dev mode run the following command:

```BASH
docker compose --file ./docker-compose.yml --file ./docker-compose.dev.yml up --force-recreate --build --abort-on-container-exit
```

## Running in Production

To get the containers up and running in production mode run the following command:

```BASH
docker compose --file ./docker-compose.yml up --detach --force-recreate --build
```
