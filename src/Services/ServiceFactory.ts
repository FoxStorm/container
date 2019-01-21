import { Container } from './ApplicationContainer'

export interface ServiceFactory {
  readonly serviceType: any
  readonly serviceSupports: any[]
  makeService (container: Container): any
}
