Package.describe({
  name: 'arggh:fluent-compiler',
  version: '1.0.0',
  summary: 'Fluent compiler',
  documentation: 'README.md'
});

Npm.depends({
  'fluent-compiler':  '0.1.0'
});

Package.registerBuildPlugin({
  name: 'fluent-compiler',
  use: [
    'babel-compiler@7.5.1',
    'caching-compiler@1.2.1',
    'ecmascript@0.14.1'
  ],
  sources: [
    'fluent-compiler.js',
    'fluent.js'
  ],
  npmDependencies: {
    'fluent-compiler': '0.1.0'
  }
});

Package.onUse(function (api) {
  api.versionsFrom('1.8');
  api.use('isobuild:compiler-plugin@1.0.0');

  api.imply([
    'modules',
    'ecmascript-runtime',
    'babel-runtime',
    'promise'
  ]);
});