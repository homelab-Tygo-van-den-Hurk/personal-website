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

      #| ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Nix Flake Check ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ |#

      checks.default = self.packages.${system}.default;

      #| ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Nix Develop ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ |#

      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [ 
          nodejs_23                  # Run the JavaScript manually.
          nodemon                    # Watches files and redstarts node if needed.
          typescript                 # Compile the TypeScript code manually.
          typescript-language-server # The language server IDEs use.
          # nodePackages.postcss-cli   # compile tailwind using an input file #! Does not compile
          nodePackages.tailwindcss   # a component solution to writing CSS.
          act                        # Run GitHub Actions locally.
          eslint                     # Run linting on source files.
        ];
      };

      #| ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Nix Build ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ |#

      packages = {

        default = pkgs.stdenv.mkDerivation rec {
          name = "tvdh-personal-websites";
          src = ./.;

          installPhase = ''
            runHook preInstall
            
            mkdir --parents $out/bin
            cp --recursive ${self.packages.${system}.backend-bin}/bin/* $out/bin
            cp --recursive ${self.packages.${system}.frontend-bin}/bin/* $out/bin
            cp --recursive ${self.packages.${system}.redirects-bin}/bin/* $out/bin
            
            mkdir --parents $out/docker
            cp --recursive ${self.packages.${system}.backend-docker} $out/docker/backend
            cp --recursive ${self.packages.${system}.frontend-docker} $out/docker/frontend
            cp --recursive ${self.packages.${system}.redirects-docker} $out/docker/redirects
             
            runHook postInstall
          '';
        };


        #` Backend
        
        backend-lib = pkgs.callPackage ./backend/nix/packages/lib {
          inherit lib;
          self = { 
            path = ./backend;
            lib = self.packages.${system}.backend-lib;
            bin = self.packages.${system}.backend-bin;
          };
        };

        backend-bin = pkgs.callPackage ./backend/nix/packages/bin {
          node = pkgs.nodejs_23;
          self = { 
            path = ./backend;
            lib = self.packages.${system}.backend-lib;
            bin = self.packages.${system}.backend-bin;
          };
        };  

        backend-docker = pkgs.callPackage ./backend/nix/packages/docker {
          lastModifiedDate = self.lastModifiedDate;
          node = pkgsLinux.nodejs_23;
          self = { 
            path = ./backend;
            lib = self.packages.${system}.backend-lib;
            bin = self.packages.${system}.backend-bin;
          };
        };


        #` Frontend
        
        frontend-lib = pkgs.callPackage ./frontend/nix/packages/lib {
          inherit lib;
          self = { 
            path = ./frontend;
            lib = self.packages.${system}.frontend-lib;
            bin = self.packages.${system}.frontend-bin;
          };
        };

        frontend-bin = pkgs.callPackage ./frontend/nix/packages/bin {
          node = pkgs.nodejs_23;
          self = { 
            path = ./frontend;
            lib = self.packages.${system}.frontend-lib;
            bin = self.packages.${system}.frontend-bin;
          };
        };  

        frontend-docker = pkgs.callPackage ./frontend/nix/packages/docker {
          lastModifiedDate = self.lastModifiedDate;
          node = pkgsLinux.nodejs_23;
          self = { 
            path = ./frontend;
            lib = self.packages.${system}.frontend-lib;
            bin = self.packages.${system}.frontend-bin;
          };
        };


        #` Redirects
        
        redirects-lib = pkgs.callPackage ./redirects/nix/packages/lib {
          inherit lib;
          self = { 
            path = ./redirects;
            lib = self.packages.${system}.redirects-lib;
            bin = self.packages.${system}.redirects-bin;
          };
        };

        redirects-bin = pkgs.callPackage ./redirects/nix/packages/bin {
          node = pkgs.nodejs_23;
          self = { 
            path = ./redirects;
            lib = self.packages.${system}.redirects-lib;
            bin = self.packages.${system}.redirects-bin;
          };
        };  

        redirects-docker = pkgs.callPackage ./redirects/nix/packages/docker {
          lastModifiedDate = self.lastModifiedDate;
          node = pkgsLinux.nodejs_23;
          self = { 
            path = ./redirects;
            lib = self.packages.${system}.redirects-lib;
            bin = self.packages.${system}.redirects-bin;
          };
        };


        #` Miscellaneous 

        css = pkgs.stdenv.mkDerivation rec {
          name = "css";
          src = ./.;

          buildPhase = ''
            runHook preBuild
            ${pkgs.tailwindcss}/bin/tailwindcss --input ./tailwind.input.css --output ./tailwind.output.css --minify
            runHook postBuild
          '';


          installPhase = ''
            runHook preInstall
            mkdir --parents $out
            mv ./tailwind.output.css $out
            runHook postInstall
          '';
        };

        dev-bundle = pkgs.buildEnv {
          name = "dev-bundle";
          paths = with pkgs; [ 
            toybox 
            bash 
            nodemon 
            nodejs_23 
            nodePackages.tailwindcss 
            typescript
            eslint
          ];
        };

      };
      #| ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ |#
    }
  );
}
