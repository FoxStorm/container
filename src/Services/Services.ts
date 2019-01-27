import { BaseServiceFactory } from './BaseServiceFactory'
import { ServiceDescriptionBuilder } from './ServiceDescriptionBuilder'
import { Provider } from '../Provider'
import { Container } from '../ApplicationContainer'
import { TypeServiceFactory } from './TypeServiceFactory'
import { ServiceFactory } from './ServiceFactory'
import { ServicesError } from './ServicesError'

export interface ServicesRegistrar {
  // INSTANCE
  registerInstance<S> (instance: S): void
  registerInstanceWithInterface<S> (instance: S, supportedInterface: string): void
  registerInstanceWithInterfaces<S> (instance: S, supportedInterfaces: string[]): void

  // FACTORY
  registerServiceWithFactory<S> (serviceType: (new (...args: any[]) => S), factory: (container: Container) => S): void
  registerServiceWithInterfaceAndFactory<S> (serviceType: (new (...args: any[]) => S), supportedInterface: string, factory: (container: Container) => S): void
  registerServiceWithInterfacesAndFactory<S> (serviceType: (new (...args: any[]) => S), supportedInterface: string[], factory: (container: Container) => S): void
  registerInterfaceAndFactory<S> (supportedInterface: string, factory: (container: Container) => S): void

  // TYPE
  registerService<S> (serviceType: (new (...args: any[]) => S)): void
  registerServiceWithInterface<S> (serviceType: (new (...args: any[]) => S), supportedInterface: string): void
  registerServiceWithInterfaces<S> (serviceType: (new (...args: any[]) => S), supportedInterfaces: string[]): void

  // PROVIDER
  registerProvider (provider: Provider): void

  // CUSTOM
  registerFactory (factory: BaseServiceFactory): void
  description (): string
}

export class Services implements ServicesRegistrar {
  readonly factories: ServiceFactory[] = []
  readonly providers: Provider[] = []

  // INSTANCE

  // Registers a pre-initialized instance of a `Service`.
  // services.registerInstance(new PrintLogger())
  registerInstance<S> (instance: S): void {
    this.registerInstanceWithInterfaces(instance, [])
  }

  // Registers a pre-initialized instance of a `Service` conforming to a single interface.
  // services.registerInstanceWithInterface(new PrintLogger(), 'Logger')
  registerInstanceWithInterface<S> (instance: S, supportedInterface: string): void {
    this.registerInstanceWithInterfaces(instance, [supportedInterface])
  }

  // Registers a pre-initialized instance of a `Service` conforming to zero or many interfaces.
  // services.registerInstanceWithInterfaces(new PrintLogger(), [ 'Logger', 'ErrorLogger' ])
  registerInstanceWithInterfaces<S> (instance: S, supportedInterfaces: string[]): void {
    const serviceFactory = new BaseServiceFactory(instance.constructor, supportedInterfaces, () => {
      return instance
    })
    this.registerFactory(serviceFactory)
  }

  // FACTORY

  // Registers a `Service` creating closure (service factory).
  // services.registerInterfaceWithFactory(PrintLogger, () => {
  //   return new PrintLogger()
  // })
  registerServiceWithFactory<S> (serviceType: (new (...args: any[]) => S), factory: (container: Container) => S): void {
    const serviceFactory = new BaseServiceFactory(serviceType, [], (container: Container) => {
      try { return factory(container) } catch {
        throw new ServicesError('registerServiceWithFactory', 'Error executing factory')
      }
    })
    this.registerFactory(serviceFactory)
  }

  // Registers a `Service` creating closure (service factory) conforming to a single interface.
  // services.registerInterfaceWithFactory(PrintLogger, 'Logger', () => {
  //   return new PrintLogger()
  // })
  registerServiceWithInterfaceAndFactory<S> (serviceType: (new (...args: any[]) => S), supportedInterface: string, factory: (container: Container) => S): void {
    const serviceFactory = new BaseServiceFactory(serviceType, [supportedInterface], (container: Container) => {
      try { return factory(container) } catch {
        throw new ServicesError('registerServiceWithInterfaceAndFactory', 'Error executing factory')
      }
    })
    this.registerFactory(serviceFactory)
  }

  // Registers a `Service` creating closure (service factory) conforming to zero or many interfaces.
  // services.registerInterfaceWithFactory(PrintLogger, [ 'Logger', 'ErrorLogger' ], () => {
  //   return new PrintLogger()
  // })
  registerServiceWithInterfacesAndFactory<S> (serviceType: (new (...args: any[]) => S), supportedInterfaces: string[], factory: (container: Container) => S): void {
    const serviceFactory = new BaseServiceFactory(serviceType, supportedInterfaces, (container: Container) => {
      try { return factory(container) } catch {
        throw new ServicesError('registerServiceWithInterfacesAndFactory', 'Error executing factory')
      }
    })
    this.registerFactory(serviceFactory)
  }

  // Registers a `Service` creating closure (service factory) conforming to zero or many interfaces.
  // services.registerInterfaceAndFactory('Logger', () => {
  //   return new PrintLogger()
  // })
  registerInterfaceAndFactory<S> (supportedInterface: string, factory: (container: Container) => S): void {
    const serviceFactory = new BaseServiceFactory(supportedInterface, [supportedInterface], (container: Container) => {
      try { return factory(container) } catch {
        throw new ServicesError('registerInterfaceAndFactory', 'Error executing factory')
      }
    })
    this.registerFactory(serviceFactory)
  }

  // TYPE

  // Registers a `ServiceType` to the `Services`. This is the most concise register method since the `ServiceType`
  // services.registerService(PrintLogger)
  registerService<S> (serviceType: (new (...args: any[]) => S)): void {
    const serviceFactory = new TypeServiceFactory(serviceType)
    this.registerFactory(serviceFactory)
  }

  // Registers a `Service` creating closure (service factory).
  // services.registerServiceWithInterface(PrintLogger, 'Logger')
  registerServiceWithInterface<S> (serviceType: (new (...args: any[]) => S), supportedInterface: string): void {
    const serviceFactory = new TypeServiceFactory(serviceType, [supportedInterface])
    this.registerFactory(serviceFactory)
  }

  // Registers a `Service` creating closure (service factory).
  // services.registerServiceWithInterfaces(PrintLogger, [ 'Logger', 'ErrorLogger' ])
  registerServiceWithInterfaces<S> (serviceType: (new (...args: any[]) => S), supportedInterfaces: string[]): void {
    const serviceFactory = new TypeServiceFactory(serviceType, supportedInterfaces)
    this.registerFactory(serviceFactory)
  }

  // PROVIDER

  // Registers a `Provider` to the services. This will automatically register all of the `Provider`'s available
  // try  { services.registerProvider(new PrintLoggerProvider()) } catch { }
  registerProvider (provider: Provider): void {
    const foundProvider = this.providers.find(existingProvider => typeof existingProvider === typeof provider)

    if (!foundProvider) {
      try { provider.register(this) } catch { /* */ }
      this.providers.push(provider)
    }
  }

  // CUSTOM

  //  Registers any type conforming to `ServiceFactory`. This method should only be used when implementing custom
  registerFactory (factory: ServiceFactory): void {
    const existing = this.factories.indexOf(factory)

    if (existing) {
      this.factories[existing] = factory
    }

    this.factories.push(factory)
  }

  description (): string {
    return new ServiceDescriptionBuilder()
    .withServices(this.factories)
    .withProviders(this.providers)
    .build()
  }
}
