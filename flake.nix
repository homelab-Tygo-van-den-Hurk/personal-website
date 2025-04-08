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
          act                        # Run GitHub Actions locally.
        ];
      };

      #| ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Nix Build ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ |#

      packages = let 
          
        backendPackageJson = (nixpkgs.lib.importJSON ./backend/package.json);
        frontendPackageJson = (nixpkgs.lib.importJSON ./frontend/package.json);
        redirectsPackageJson = (nixpkgs.lib.importJSON ./redirects/package.json);
        
      in {

        default = pkgs.stdenv.mkDerivation rec {
          name = "tvdh-personal-websites";
          src = ./.;

          installPhase = ''
            runHook preInstall
            
            mkdir --parents $out/bin
            cp --recursive ${self.packages.${system}.backend-bin}/bin/* $out/bin
            cp --recursive ${self.packages.${system}.frontend-bin}/bin/* $out/bin
            cp --recursive ${self.packages.${system}.redirects-bin}/bin/* $out/bin
            
            mkdir --parents $out/images
            cp --recursive ${self.packages.${system}.backend-docker-image} $out/images/backend
            cp --recursive ${self.packages.${system}.frontend-docker-image} $out/images/frontend
            cp --recursive ${self.packages.${system}.redirects-docker-image} $out/images/redirects
             
            runHook postInstall
          '';
        };


        #` Backend
          
        backend-bin = pkgs.writeShellScriptBin "backend" ''
            ${pkgs.nodejs_23} ${self.packages.${system}.backend-npm-package}/dist/index.js
          '';

        backend-npm-package = pkgs.buildNpmPackage {
        
          pname = backendPackageJson.name;
          version = backendPackageJson.version;
          
          src = ./backend;
          npmDepsHash = "sha256-lLWAkgrHbVDKI9BQCHTbm9ZWpHaW3QOXWbFc2QnlOR4=";

          buildPhase = ''
            runHook preBuild
            
            ${pkgs.typescript}/bin/tsc

            runHook postBuild
          '';

          installPhase = ''
            runHook preInstall
            
            mkdir --parents $out
            mv node_modules $out
            mv dist $out

            runHook postInstall
          '';
        };
          
        backend-docker-image = pkgs.dockerTools.buildImage {
        
          name = backendPackageJson.name;
          tag = backendPackageJson.version;
          created = builtins.substring 0 8 self.lastModifiedDate;

          config = {
            Cmd = [ "${self.packages.x86_64-linux.backend-bin}/bin/backend" ];
          };
        };


        #` Frontend

        frontend-bin = pkgs.writeShellScriptBin "frontend" ''
          ${pkgs.nodejs_23} ${self.packages.${system}.frontend-npm-package}/dist/index.js
        '';

        frontend-npm-package = pkgs.buildNpmPackage {
          
          pname = frontendPackageJson.name;
          version = frontendPackageJson.version;
          
          src = ./frontend;
          npmDepsHash = "sha256-Rja5P9yOrW6dqnghQIVx77VnbsN5whN9oBdj4QK5tfc=";

          buildPhase = ''
            runHook preBuild
            
            ${pkgs.typescript}/bin/tsc

            runHook postBuild
          '';

          installPhase = ''
            runHook preInstall
            
            mkdir --parents $out
            mv node_modules $out
            mv dist $out

            runHook postInstall
          '';
        };
              
        frontend-docker-image = pkgs.dockerTools.buildImage {
          
          name = frontendPackageJson.name;
          tag = frontendPackageJson.version;
          created = builtins.substring 0 8 self.lastModifiedDate;
          
          config = {
            Cmd = [ "${self.packages.x86_64-linux.frontend-bin}/bin/frontend"];
          };
        };


        #` Redirects
        
        redirects-bin = pkgs.writeShellScriptBin "redirects" ''
          ${pkgs.nodejs_23} ${self.packages.${system}.redirects-npm-package}/dist/index.js
        '';

        redirects-npm-package = pkgs.buildNpmPackage {
          
          pname = redirectsPackageJson.name;
          version = redirectsPackageJson.version;
          
          src = ./redirects;
          npmDepsHash = "sha256-+g1Qu0bA3vJQ/FLTmRtes9mP3iDhDwqBrgrXACLHmGg=";

          buildPhase = ''
            runHook preBuild
            
            ${pkgs.typescript}/bin/tsc

            runHook postBuild
          '';

          installPhase = ''
            runHook preInstall
            
            mkdir --parents $out
            mv node_modules $out
            mv dist $out

            runHook postInstall
          '';
        };
            
        redirects-docker-image = pkgs.dockerTools.buildImage {
          
          name = redirectsPackageJson.name;
          tag = redirectsPackageJson.version;
          created = builtins.substring 0 8 self.lastModifiedDate;

          config = {
            Cmd = [ "${self.packages.x86_64-linux.redirects-bin}/bin/redirects" ];
          };
        };

      };
      #| ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ |#
    }
  );
}
