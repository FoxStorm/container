export class ServicesError extends Error {
  public readonly readableName = 'Framework Error'

  constructor (
    readonly typeIdentifier: string,
    readonly reason: string,
    readonly suggestedFixes: string[] = [],
    readonly possibleCauses: string[] = []
  ) {
    super(reason)
  }
}
