> This directory will be used to store the files needed for the redirection server.

[< Back to project root](../README.md)

# The Redirection Server

- [The Redirection Server](#the-redirection-server)
  - [Overview](#overview)
  - [How this implementation works](#how-this-implementation-works)

## Overview

The redirection server is the server that hosts a bunch of URLs that redirect you to the right places. For example: `redirects.tygo.van.den.hurk.dev/github/personal` redirects you to my personal github. This has two functions:

1. I only have to change 1 link if a link brakes.
2. I can count how many people clicked on a link.

## How this implementation works

This implementation works like a file system tree. We first break the path in the link up into its directories. So: `redirects.com/some/path` gets turned into: `some`, `path`. We then recurse our tree to see where we end up. There are two types of nodes, internal nodes and leaf nodes. The leaf nodes redirect if the path ends there, or return a 404 if you try to go deeper, and the internal nodes return a selection of its children when you end there, and a 404 if you try to go into a child that does not exist. Here is an example:

```JS
const NODES = {
    name: "root";
    children: {
        
        ...

        "github": {
            name: "GitHub";
            children: {
                
                ...
                
                "personal": {
                    name: "my personal account";
                    url: "https://github.com/..."
                },

                ...
                
            },
        },

        ...
    },
}
```

Valid paths would be: `/`, `/github`, `/github/personal`.
