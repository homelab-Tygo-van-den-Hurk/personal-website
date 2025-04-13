{
  pkgs,
  self,
  node,
}:

pkgs.writeShellScriptBin "frontend" ''
  ${node}/bin/node ${self.lib}/dist/index.js "$@"
''
