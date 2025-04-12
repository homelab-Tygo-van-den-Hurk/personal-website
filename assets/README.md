> This server is used as the asset server. It serves pictures, code, and other static elements.

[< Back to project root](../README.md)

# The Asset Server

- [The Asset Server](#the-asset-server)
  - [Overview](#overview)
  - [Structure](#structure)

## Overview

This server exists to serve assets. This way I know that all my assets are up to date on all services. So if I rewrite the theme this will be reflected on all services. It also increases the chances that a request is cached in the browser.

## Structure

There are 2 directories: public and config. Public contains the files that will be served. Any URL will be mapped exactly to the file present so `https://assets.tygo.van.den.hurk.dev/images/png/dog.png` will be mapped to `./public/images/png/dog.png`.