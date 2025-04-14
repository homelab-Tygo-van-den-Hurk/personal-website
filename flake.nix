{
  description = "The flake used for created a nix shell with node and npm";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... } @ inputs: flake-utils.lib.eachDefaultSystem ( system:
    let

      pkgs = import nixpkgs { inherit system; };
      pkgsLinux = import nixpkgs { system = "x86_64-linux"; };
      lib = nixpkgs.lib;

    in rec { 
      
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [ 
          nodejs_23                  # Run the JavaScript manually.
          nodemon                    # Watches files and redstarts node if needed.
          typescript                 # Compile the TypeScript code manually.
          typescript-language-server # The language server IDEs use.
          nodePackages.tailwindcss   # a component solution to writing CSS.
          act                        # Run GitHub Actions locally.
          eslint                     # Run linting on source files.
        ];
      };
    }
  );
}
