import { Container } from '../ApplicationContainer'
import { ServiceFactory } from './ServiceFactory'

export class BaseServiceFactory implements ServiceFactory {
  constructor (
    readonly serviceType: any,
    readonly serviceSupports: string[],
    readonly closure: (container: Container) => any
  ) {}

  makeService (container: Container): any {
    try {
      return this.closure(container)
    } catch { throw new Error() }
  }
}
