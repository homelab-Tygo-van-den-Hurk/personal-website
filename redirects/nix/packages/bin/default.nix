{
  pkgs,
  node,
  self,
}:

pkgs.writeShellScriptBin "redirects" ''
  ${node}/bin/node ${self.lib}/dist/src/index.js "$@"
''
