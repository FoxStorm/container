export interface IServiceFactory {
  readonly serviceType: any
  readonly serviceSupports: any[]
}

export class ServiceFactory implements IServiceFactory {
  constructor (readonly serviceType: any, readonly serviceSupports: string[]) {}
}
