{
  pkgs,
  node,
  self,
}:

pkgs.writeShellScriptBin "backend" ''
  ${node}/bin/node ${self.lib}/dist/src/index.js "$@"
''
