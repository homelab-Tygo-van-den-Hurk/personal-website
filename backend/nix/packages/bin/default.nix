{
  pkgs,
  node,
  self,
}:

pkgs.writeShellScriptBin "backend" ''
  ${node}/bin/node ${self.lib}/dist/index.js "$@"
''
