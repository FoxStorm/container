import { Environment } from './Environment'
import { Services } from './Services'
import { ServiceFactory } from './ServiceFactory'
import { ContainerError } from '../ContainerError'
import { Config } from './Config'
import { Service } from './Service'

export interface Container {
  readonly config: Config
  readonly environment: Environment
  readonly services: Services,
  readonly booted: boolean,
  retrieveServiceFor (serviceInterface: string): Service
}

export class ApplicationContainer implements Container {
  readonly booted: boolean

  constructor (readonly config: Config, readonly environment: Environment, readonly services: Services) {
    this.booted = false
  }

  retrieveServiceFor<T> (serviceInterface: string | (new () => T)): T {
    const interfaceName = this.resolveInterfaceName(serviceInterface)
    const available = this.servicesFor(interfaceName)

    if (available.length > 1) {
      // resolve dissambiguity
    }

    if (available.length === 0) {
      throw new ContainerError(
        'make',
        `No services available for ${interfaceName}`,
        [
          `Register a service for ${interfaceName}.`,
          `services.register(${interfaceName}) { ... }.`
        ]
      )
    }

    return available[0].serviceType.makeService()
  }

  private servicesFor (supportedInterface: any): ServiceFactory[] {

    return this.services.factories.filter(factory => {
      const isTheServiceItself = factory.serviceType.name === supportedInterface
      const isServiceSupporting = factory.serviceSupports.find(supportedService => supportedService === supportedInterface)
      return isTheServiceItself || isServiceSupporting
    })
  }

  private resolveInterfaceName<T> (serviceInterface: string | T): string {
    if (typeof serviceInterface === 'string') {
      return serviceInterface
    }

    return (serviceInterface as unknown as any).name
  }
}
