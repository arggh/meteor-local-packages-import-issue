import { BabelCompiler } from 'meteor/babel-compiler';
import { compile }  from 'fluent-compiler';

if (Error.METEOR_prepareStackTrace) {
  Error.prepareStackTrace = Error.METEOR_prepareStackTrace;
}

export class FluentCompiler {
  constructor() {
    this.babelCompiler = new BabelCompiler({
      runtime: false,
    });
  }

  outputFilePath(inputFile) {
    return inputFile.getPathInPackage() + '.js';
  }

  compileOneFile(inputFile) {
    const source = inputFile.getContentsAsString();

    let output;
    try {
      output = compile('en', source); // Use hardcoded `en` for locale, for now. Parse from file name?
    } catch (e) {
      inputFile.error({
        message: e.message,
        line: e.location && (e.location.first_line + 1),
        column: e.location && (e.location.first_column + 1)
      });
      return null;
    }

    const { data } = this.babelCompiler.processOneFileForTarget(inputFile, output);

    return {
      path: this.outputFilePath(inputFile),
      data
    };
  }
}