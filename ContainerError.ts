export class ContainerError extends Error {
  public readonly readableName = 'Framework Error'
  // public readonly sourceLocation: SourceLocation
  // public readonly stackTrace: string[]

  constructor (
    readonly typeIdentifier: string,
    readonly reason: string,
    readonly suggestedFixes: string[] = [],
    readonly possibleCauses: string[] = []
  ) {
    super(reason)
    // this.sourceLocation = this.makeSourceLocation()
    // this.stackTrace = this.makeStackTrace()
  }
}
