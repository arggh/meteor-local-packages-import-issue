import { FluentCompiler } from './fluent-compiler';

Plugin.registerCompiler({
  extensions: ['ftl']
}, () => new CachedFluentCompiler());

// The CompileResult for this CachingCompiler is a {source, sourceMap} object.
class CachedFluentCompiler extends CachingCompiler {
  constructor() {
    super({
      compilerName: 'fluent-compiler',
      defaultCacheSize: 1024*1024*10,
    });

    this.fluentCompiler = new FluentCompiler();
  }

  getCacheKey(inputFile) {
    return [
      inputFile.getPathInPackage(),
      inputFile.getSourceHash(),
      inputFile.getArch()
    ];
  }

  setDiskCacheDirectory(cacheDir) {
    this.fluentCompiler.babelCompiler.setDiskCacheDirectory(cacheDir);
    return super.setDiskCacheDirectory(cacheDir);
  }

  compileResultSize(compileResult) {
    return compileResult.data.length;
  }

  compileOneFile(inputFile) {
    return this.fluentCompiler.compileOneFile(inputFile);
  }

  addCompileResult(inputFile, result) {
    inputFile.addJavaScript({
      path: this.fluentCompiler.outputFilePath(inputFile),
      sourcePath: inputFile.getPathInPackage(),
      data: result.data,
      bare: inputFile.getFileOptions().bare
    });
  }
}