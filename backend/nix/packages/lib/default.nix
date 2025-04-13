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
    npmDepsHash = "sha256-lLWAkgrHbVDKI9BQCHTbm9ZWpHaW3QOXWbFc2QnlOR4=";

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
