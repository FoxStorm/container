import { ServiceFactory } from './ServiceFactory'

export type ConfigPreference = {
  readonly prefer: any
  readonly for: string
}

export class Config {
  readonly preferences: ConfigPreference[] = []

  usePreference (preference: ConfigPreference): void {
    this.preferences.push(preference)
  }

  resolveService<T> (fromAvailableServices: ServiceFactory[], serviceInterface: string | (new () => T)): ServiceFactory {
    const foundPreference = this.preferences.find(preference => preference.for === serviceInterface)

    if (!foundPreference) {
      throw new Error('')
    }

    const fromAvailable = fromAvailableServices.filter(service => foundPreference.for === service.serviceType)

    if (fromAvailable.length === 0) {
      throw new Error('None found')
    } else if (fromAvailable.length > 1) {
      throw new Error('Too Many found')
    }

    return fromAvailable[0]
  }
}
