import { Services } from './Services'

export interface Provider {
  register(services: Services): void
  willBoot(): Promise<void>
  didBoot(): Promise<void>
}
