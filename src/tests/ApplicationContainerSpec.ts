import { expect } from 'chai'
import { Config } from '../Config'
import { Environment } from '../Environment'
import { Services } from '../Services/Services'
import { ApplicationContainer } from '../ApplicationContainer'
import { Provider, BaseProvider } from '../Provider'

describe('ApplicationContainer', () => {
  /* FAKE CLASSES AND INTERFACE USED IN TESTS */
  interface FakeLogger {}

  class FakeFileLogger implements FakeLogger {
    static makeService (): FakeFileLogger {
      return new this('/default/path/app.log')
    }

    constructor (readonly path?: string) {}

    returnHaHa (): string {
      return 'ha ha'
    }
  }

  class FakeLoggerProvider extends BaseProvider implements Provider {
    didBoot () {
      return Promise.resolve()
    }

    register (services: Services) {
      services.registerInstance(new FakeFileLogger())
    }
  }

  interface FakeConsole {}

  class ConsoleLogger implements FakeConsole {

    constructor (readonly path?: string) {}

    returnMeow (): string {
      return 'meow'
    }
  }

  const NewApplication = (customConfig?: Config) => {
    const environment = Environment.development()
    const config = customConfig || new Config()
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
    const serviceEntity: typeof FakeFileLogger = FakeFileLogger
    const serviceInstance: FakeFileLogger = new serviceEntity()
    const interfaceEntity: string = 'FakeLogger'

    type ServicesConfig = {
      readonly [index: string]: {
        readonly entity: typeof FakeFileLogger | string,
        readonly str: string
      }
    }

    const servicesConfig: ServicesConfig = {
      service: { entity: serviceEntity, str: 'FakeFileLogger' },
      interface: { entity: interfaceEntity, str: 'FakeLogger' }
    }

    for (const entityType in servicesConfig) {
      const configService = servicesConfig[entityType]

      describe('when there is no service registered', () => {
        it(`throws an error when it tries to retrieve a service by ${entityType}`, () => {
          const { application } = NewApplication()
          expect(() => application.retrieveServiceFor(configService.entity)).to.throw(`No services available for ${configService.str}`)
        })
      })

      describe(`when the service is registered using .registerInstanceWithInterface`, () => {
        it(`retrieves the correct instance when the service is retrieved by ${entityType}`, () => {
          const { application, services } = NewApplication()

          services.registerInstanceWithInterface(serviceInstance, interfaceEntity)
          const service = application.retrieveServiceFor(configService.entity)

          expect(service).to.be.instanceOf(serviceEntity)
        })
        it(`returns the correct value from an instance method when the service is retrieved by ${entityType}`, () => {
          const { application, services } = NewApplication()

          services.registerInstanceWithInterface(serviceInstance, interfaceEntity)
          const service: any = application.retrieveServiceFor(configService.entity)

          expect(service.returnHaHa()).to.eq('ha ha')
        })
      })

      describe(`when the service is registered using .registerInstanceWithInterfaces`, () => {
        it(`retrieves the correct instance when the service is retrieved by ${entityType}`, () => {
          const { application, services } = NewApplication()

          services.registerInstanceWithInterfaces(serviceInstance, [interfaceEntity])
          const service = application.retrieveServiceFor(configService.entity)

          expect(service).to.be.instanceOf(serviceEntity)
        })
        it(`returns the correct value from an instance method when the service is retrieved by ${entityType}`, () => {
          const { application, services } = NewApplication()

          services.registerInstanceWithInterfaces(serviceInstance, [interfaceEntity])
          const service: any = application.retrieveServiceFor(configService.entity)

          expect(service.returnHaHa()).to.eq('ha ha')
        })
      })
    }

    describe(`when the service is registered using .registerInstance`, () => {
      it(`retrieve the correct instance when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()

        services.registerInstance(serviceInstance)
        const service = application.retrieveServiceFor(serviceEntity)

        expect(service).to.be.instanceOf(serviceEntity)
      })
      it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()

        services.registerInstance(serviceInstance)
        const service: any = application.retrieveServiceFor(serviceEntity.name)

        expect(service.returnHaHa()).to.eq('ha ha')
      })
    })

    describe(`when the service is registered using .registerService`, () => {
      it(`retrieve the correct instance when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()

        services.registerService(serviceEntity)

        const service = application.retrieveServiceFor(serviceEntity)

        expect(service).to.be.instanceOf(serviceEntity)
      })
      it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()

        services.registerService(serviceEntity)

        const service: any = application.retrieveServiceFor(serviceEntity)

        expect(service.returnHaHa()).to.eq('ha ha')
      })
    })

    describe(`when the service is registered using .registerServiceWithFactory`, () => {
      it(`retrieve the correct instance when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()

        services.registerServiceWithFactory(serviceEntity, () => {
          return new FakeFileLogger('customPath')
        })

        const service = application.retrieveServiceFor(serviceEntity)

        expect(service).to.be.instanceOf(serviceEntity)
      })
      it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()

        services.registerServiceWithFactory(serviceEntity, () => {
          return new FakeFileLogger('customPath')
        })

        const service: any = application.retrieveServiceFor(serviceEntity)

        expect(service.returnHaHa()).to.eq('ha ha')
      })
    })

    describe(`when the service is registered using .registerServiceWithInterfaceAndFactory`, () => {
      it(`retrieve the correct instance when the service is retrieved by the service`, () => {
        const { application, services } = NewApplication()

        services.registerServiceWithInterfaceAndFactory(ConsoleLogger, 'FakeConsole', () => {
          return new ConsoleLogger('customPath')
        })

        const service = application.retrieveServiceFor(ConsoleLogger)

        expect(service).to.be.instanceOf(ConsoleLogger)
      })
      it(`returns the correct value from an instance method when the service is retrieved by the service`, () => {
        const { application, services } = NewApplication()

        services.registerServiceWithInterfaceAndFactory(ConsoleLogger, 'FakeConsole', () => {
          return new ConsoleLogger('customPath')
        })

        const service: any = application.retrieveServiceFor(ConsoleLogger)

        expect(service.returnMeow()).to.eq('meow')
      })
      it(`returns the correct constructor value when the service is retrieved by the service`, () => {
        const { application, services } = NewApplication()

        services.registerServiceWithInterfaceAndFactory(ConsoleLogger, 'FakeConsole', () => {
          return new ConsoleLogger('customPath')
        })

        const service: any = application.retrieveServiceFor(ConsoleLogger)

        expect(service.path).to.eq('customPath')
      })
    })

    describe(`when the service is registered using .registerInterfaceAndFactory`, () => {
      it(`retrieve the correct instance when the service is retrieved by an interface`, () => {
        const { application, services } = NewApplication()

        services.registerInterfaceAndFactory('FakeConsole', () => {
          return new ConsoleLogger('customPath')
        })

        const service = application.retrieveServiceFor('FakeConsole')

        expect(service).to.be.instanceOf(ConsoleLogger)
      })
      it(`returns the correct value from an instance method when the service is retrieved by an interface`, () => {
        const { application, services } = NewApplication()

        services.registerInterfaceAndFactory('FakeConsole', () => {
          return new ConsoleLogger('customPath')
        })

        const service: any = application.retrieveServiceFor('FakeConsole')

        expect(service.returnMeow()).to.eq('meow')
      })
      it(`returns the correct constructor value when the service is retrieved by an interface`, () => {
        const { application, services } = NewApplication()

        services.registerInterfaceAndFactory('FakeConsole', () => {
          return new ConsoleLogger('customPath')
        })

        const service: any = application.retrieveServiceFor('FakeConsole')

        expect(service.path).to.eq('customPath')
      })
    })

    describe(`when the service is registered using .registerProvider`, () => {
      it(`retrieve the correct instance when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()
        const loggerProvider = new FakeLoggerProvider()

        services.registerProvider(loggerProvider)

        const service = application.retrieveServiceFor(serviceEntity)

        expect(service).to.be.instanceOf(serviceEntity)
      })
      it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()
        const loggerProvider = new FakeLoggerProvider()

        services.registerProvider(loggerProvider)

        const service: any = application.retrieveServiceFor(serviceEntity)

        expect(service.returnHaHa()).to.eq('ha ha')
      })
    })
  })
})
