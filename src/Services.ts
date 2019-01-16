import { ServiceFactory } from './ServiceFactory'
import { ServiceDescriptionBuilder } from './ServiceDescriptionBuilder'
import { Provider } from './Provider'
import { ServiceType } from './ServiceType'

export class Services {
  readonly factories: ServiceFactory[] = []
  readonly providers: Provider[] = []

  registerWithInterface<S> (service: ServiceType<S>, serviceInterface: string) {
    const factory = new ServiceFactory(service, [serviceInterface])
    this.registerFactoryWithInterface(factory)
  }

  registerWithInterfaces<S> (service: ServiceType<S>, serviceInterface: string[]) {
    const factory = new ServiceFactory(service, serviceInterface)
    this.registerFactoryWithInterface(factory)
  }

  register<S> (service: ServiceType<S>) {
    const factory = new ServiceFactory(service, [])
    this.registerFactoryWithInterface(factory)
  }

  registerFactoryWithInterface (factory: ServiceFactory): void {
    const existing = this.factories.indexOf(factory)

    if (existing) {
      this.factories[existing] = factory
    }

    this.factories.push(factory)
  }

  description () {
    new ServiceDescriptionBuilder()
      .withServices(this.factories)
      .withProviders(this.providers)
      .build()
  }
}
