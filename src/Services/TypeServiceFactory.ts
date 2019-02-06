import { ServiceFactory } from './ServiceFactory'
import { ServicesError } from './ServicesError'
import { ApplicationContainer } from '../ApplicationContainer'

export interface ServiceType<U> {
  makeService (str: string): U
}

export class TypeServiceFactory implements ServiceFactory {
  constructor (readonly serviceType: any, readonly serviceSupports: string[] = []) {}

  makeService (container: ApplicationContainer) {
    if (this.serviceType.makeService === undefined) {
      throw new ServicesError('serviceRegister', `${this.serviceType} does not implement makeService method`)
    }

    try {
      return this.serviceType.makeService(container)
    } catch (error) { throw error }
  }
}
