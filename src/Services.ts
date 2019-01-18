import { ServiceFactory } from './ServiceFactory'
import { ServiceDescriptionBuilder } from './ServiceDescriptionBuilder'
import { Provider } from './Provider'

export interface ServicesRegistrar {
  register<S> (service: (new () => S), factory?: () => S): void
  registerWithInterface<S> (service: (new () => S), serviceInterface: string, factory?: () => S): void
  registerWithInterfaces<S> (service: (new () => S), serviceInterface: string[], factory?: () => S): void
  description (): string
}

export class Services implements ServicesRegistrar {
  readonly factories: ServiceFactory[] = []
  readonly providers: Provider[] = []

  register<S> (service: (new () => S), factory?: () => S): void {
    const serviceFactory = new ServiceFactory(service, [])
    this.registerFactoryWithInterface(serviceFactory)
  }

  registerWithInterface<S> (service: (new () => S), serviceInterface: string, factory?: () => S) {
    const serviceFactory = new ServiceFactory(service, [serviceInterface])
    this.registerFactoryWithInterface(serviceFactory)
  }

  registerWithInterfaces<S> (service: (new () => S), serviceInterface: string[], factory?: () => S) {
    const serviceFactory = new ServiceFactory(service, serviceInterface)
    this.registerFactoryWithInterface(serviceFactory)
  }

  description (): string {
    return new ServiceDescriptionBuilder()
    .withServices(this.factories)
    .withProviders(this.providers)
    .build()
  }

  private registerFactoryWithInterface (factory: ServiceFactory): void {
    const existing = this.factories.indexOf(factory)

    if (existing) {
      this.factories[existing] = factory
    }

    this.factories.push(factory)
  }
}
