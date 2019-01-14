import { Services } from './Services'

interface WillBoot {
  willBoot(container: any): Promise<void>
}

export interface Provider extends WillBoot {
  register(services: Services): void
  didBoot(container: any): Promise<void>
}

export class BaseProvider implements WillBoot {
  willBoot(container: any): Promise<void> {
    return Promise.resolve()
  }
}
