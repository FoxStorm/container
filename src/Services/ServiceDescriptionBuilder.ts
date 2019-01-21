import { Provider } from '../Provider'
import { ServiceFactory } from './ServiceFactory'

export class ServiceDescriptionBuilder {
  readonly description: string[] = []

  withServices (factories: ServiceFactory[]): this {
    this.description.push('Services: ')
    if (factories.length === 0) {
      this.description.push('- none')
    } else {
      factories.forEach(factory => {
        if (factory.serviceSupports.length > 0) {
          this.description.push(`- ${factory.serviceType}`)
        } else {
          const interfaces = factory.serviceSupports.map((service: any) => `${service}`).join(', ')
          this.description.push(`- ${factory.serviceType}: ${interfaces}`)
        }
      })
    }
    return this
  }

  withProviders (providers: Provider[]): this {
    this.description.push('Providers: ')
    if (providers.length === 0) {
      this.description.push('- none')
    } else {
      providers.forEach(provider => {
        this.description.push(`- ${provider}`)
      })
    }
    return this
  }

  build () {
    return this.description.join('\n')
  }
}
