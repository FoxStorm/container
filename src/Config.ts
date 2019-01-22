import { ServiceFactory } from './Services/ServiceFactory'
import { ServicesError } from './Services/ServicesError'

export type ConfigPreference = {
  readonly prefer: any
  readonly for: string
}

export class Config {
  private readonly preferences: ConfigPreference[] = []

  usePreference (preference: ConfigPreference): void {
    this.preferences.push(preference)
  }

  resolveService<T> (fromAvailableServices: ServiceFactory[], serviceInterface: string | T): ServiceFactory {
    const foundPreference = this.preferences.find(preference => preference.for === serviceInterface)

    if (!foundPreference) {
      throw new ServicesError(
        'ambiguity',
        `Please choose which ${this.resolveInterfaceName(serviceInterface)} you prefer, multiple are ` +
        `available: ${fromAvailableServices.map(service => service.serviceType.name).join(', ')}.`
      )
    }

    const fromAvailable = fromAvailableServices.filter(service => foundPreference.prefer === service.serviceType)

    if (fromAvailable.length === 0) {
      throw new ServicesError('resolveService', `No service ${foundPreference.prefer.name} has been registered for ${serviceInterface}`)
    } else if (fromAvailable.length > 1) {
      throw new ServicesError('resolveService', `Too many services registered for this type ${foundPreference.prefer.name}.`)
    }

    return fromAvailable[0]
  }

  private resolveInterfaceName<T> (serviceInterface: string | T): string {
    if (typeof serviceInterface === 'string') {
      return serviceInterface
    }

    return (serviceInterface as unknown as any).name
  }
}
