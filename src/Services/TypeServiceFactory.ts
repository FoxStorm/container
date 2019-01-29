import { ServiceFactory } from './ServiceFactory'
import { ServicesError } from './ServicesError'

export interface ServiceType<U> {
  makeService (str: string): U
}

export class TypeServiceFactory implements ServiceFactory {
  constructor (readonly serviceType: any, readonly serviceSupports: string[] = []) {}

  makeService () {
    if (this.serviceType.makeService === undefined) {
      throw new ServicesError('serviceRegister', `${this.serviceType} does not implement makeService method`)
    }

    try {
      return this.serviceType.makeService()
    } catch (error) { throw error }
  }
}
