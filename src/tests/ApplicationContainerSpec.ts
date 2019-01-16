import { expect } from 'chai'
import { Config } from '../Config'
import { Environment } from '../Environment'
import { Services } from '../Services'
import { ApplicationContainer } from '../ApplicationContainer'

describe('ApplicationContainer', () => {
  const NewApplication = () => {
    const environment = Environment.development()
    const config = new Config()
    const services = new Services()
    const application = new ApplicationContainer(config, environment, services)

    return { services, application }
  }

  describe('Initializes the class with correct params', () => {
    it('returns an instance of ApplicationContainer', () => {
      const { application } = NewApplication()
      expect(application).to.be.instanceOf(ApplicationContainer)
    })
  })

  describe('.retrieveServiceFor', () => {
    interface Logger {}

    class PrintLogger implements Logger {
      static makeService (): PrintLogger {
        return new this()
      }
      sayHaHa (): string {
        return 'jaja'
      }
    }

    const serviceEntity: typeof PrintLogger = PrintLogger
    const interfaceEntity: string = 'Logger'

    const servicesConfig: { readonly [index: string]: { readonly entity: typeof PrintLogger | string, readonly str: string } } = {
      service: { entity: serviceEntity, str: 'PrintLogger' },
      interface: { entity: interfaceEntity, str: 'Logger' }
    }

    for (const serviceEntityType in servicesConfig) {
      const configService = servicesConfig[serviceEntityType]

      describe('failing cases', () => {
        it(`throws an error as there is no service registered using ${serviceEntityType}`, () => {
          const { application } = NewApplication()
          expect(() => application.retrieveServiceFor(configService.entity)).to.throw(`No services available for ${configService.str}`)
        })
      })

      describe('success cases', () => {
        describe(`when the service is retrieved using a service with an interface`, () => {
          it(`retrieve the correct service instance when the retriever receives ${serviceEntityType}`, () => {
            const { application, services } = NewApplication()

            services.registerWithInterface(serviceEntity, interfaceEntity)
            const service = application.retrieveServiceFor(configService.entity)

            expect(service).to.be.instanceOf(serviceEntity)
          })
          it(`returns the correct value from an instance method of the service when the service is retrieved using ${serviceEntityType}`, () => {
            const { application, services } = NewApplication()

            services.registerWithInterface(serviceEntity, interfaceEntity)

            const service: any = application.retrieveServiceFor(configService.entity)

            expect(service.sayHaHa()).to.eq('jaja')
          })
        })

        describe(`when the service is registered using a service`, () => {
          it(`retrieve the correct service instance when the retriever receives ${serviceEntityType}`, () => {
            const { application, services } = NewApplication()

            services.register(serviceEntity)

            const service = application.retrieveServiceFor(serviceEntity)

            expect(service).to.be.instanceOf(serviceEntity)
          })
          it(`returns the correct value from an instance method of the service when the service is retrieved using ${serviceEntityType}`, () => {
            const { application, services } = NewApplication()

            services.register(serviceEntity)

            const service: any = application.retrieveServiceFor(serviceEntity)

            expect(service.sayHaHa()).to.eq('jaja')
          })
        })
      })
    }
  })
})
