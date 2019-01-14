export class Environment {

  // An environment for deploying your application to production.
  static production(): Environment {
      return new this('production', true)
  }

  /// An environment for developing your application.
  static development(): Environment {
    return new this('production', true)
  }

  /// An environment for testing your application.
  static testing(): Environment {
      return new this('production', true)
  }

  constructor(readonly name: string, readonly isRelease: boolean) {}
}