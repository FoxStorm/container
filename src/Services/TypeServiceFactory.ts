import { ServiceFactory } from './ServiceFactory'

export interface ServiceType<U> {
  makeService (str: string): U
}

export class TypeServiceFactory implements ServiceFactory {
  readonly serviceSupports: any[] = []

  constructor (readonly serviceType: any) {}

  makeService () {
    try { return this.serviceType.makeService() } catch { throw new Error() }
  }
}
