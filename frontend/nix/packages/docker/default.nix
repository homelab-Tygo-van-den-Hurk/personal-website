{ 
  lib,
  pkgs, 
  node,
  lastModifiedDate, 
  self,
}:

let 

  packageJson = lib.importJSON (self.path + "/package.json");

in (

  pkgs.dockerTools.buildImage rec {
    name = packageJson.name;
    tag = packageJson.version;
    created = builtins.substring 0 8 lastModifiedDate;

    config = {
      Cmd = [ "${self.bin}/bin/frontend" ];
    };
  }
)
