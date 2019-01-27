import { ServiceFactory } from './ServiceFactory'

export interface ServiceType<U> {
  makeService (str: string): U
}

export class TypeServiceFactory implements ServiceFactory {
  constructor (readonly serviceType: any, readonly serviceSupports: string[] = []) {}

  makeService () {
    try { return this.serviceType.makeService() } catch { throw new Error() }
  }
}
