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
    npmDepsHash = "sha256-TfH3j5EAxF4RsuxugSFqEdqUAG2fqvjCLKcYLAe/l54=";

    checkPhase = ''
      runHook preCheck
      npm run test
      npm run lint
      runHook postCheck
    '';

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
