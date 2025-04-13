{
  lib,
  pkgs, 
  self,
}: 

let 

  packageJson = lib.importJSON (self.path + "/package.json");

in (

  pkgs.buildNpmPackage {
    
    pname = packageJson.name;
    version = packageJson.version;
    
    src = self.path;
    npmDepsHash = "sha256-Rja5P9yOrW6dqnghQIVx77VnbsN5whN9oBdj4QK5tfc=";

    buildPhase = ''
      runHook preBuild
      npm run build
      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall
      
      mkdir --parents $out
      mv node_modules $out
      mv dist $out

      runHook postInstall
    '';
  }
)
