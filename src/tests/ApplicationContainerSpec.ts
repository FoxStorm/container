import { expect } from 'chai'
import { Config } from '../Config'
import { Environment } from '../Environment'
import { Services } from '../Services/Services'
import { ApplicationContainer } from '../ApplicationContainer'
import { Provider, BaseProvider } from '../Provider'

describe('ApplicationContainer', () => {
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
    interface Logger {}

    class FileLogger implements Logger {
      static makeService (): FileLogger {
        return new this('/default/path/app.log')
      }

      constructor (readonly path?: string) {}

      returnHaHa (): string {
        return 'ha ha'
      }
    }

    class PrintLogger implements Logger {
      static makeService (): PrintLogger {
        return new this()
      }

      returnHaHa (): string {
        return 'ha ha'
      }
    }

    const serviceEntity: typeof FileLogger = FileLogger
    const serviceInstance: FileLogger = new serviceEntity()
    const interfaceEntity: string = 'Logger'

    const servicesConfig: { readonly [index: string]: { readonly entity: typeof FileLogger | string, readonly str: string } } = {
      service: { entity: serviceEntity, str: 'FileLogger' },
      interface: { entity: interfaceEntity, str: 'Logger' }
    }

    const defaultConfig = new Config()
    const customConfig = new Config()
    const configPreference = { prefer: PrintLogger, for: 'Logger' }
    customConfig.usePreference(configPreference)

    for (const entityType in servicesConfig) {
      const configService = servicesConfig[entityType]

      describe('when there is no service registered', () => {
        it(`throws an error when it tries to retrieve a service by ${entityType}`, () => {
          const { application } = NewApplication()
          expect(() => application.retrieveServiceFor(configService.entity)).to.throw(`No services available for ${configService.str}`)
        })
      })

      describe(`when the service is registered using .registerInstanceWithInterface`, () => {
        it(`retrieve the correct instance when the service is retrieved by ${entityType}`, () => {
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
        it(`retrieve the correct instance when the service is retrieved by ${entityType}`, () => {
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
          return new FileLogger('customPath')
        })

        const service = application.retrieveServiceFor(serviceEntity)

        expect(service).to.be.instanceOf(serviceEntity)
      })
      it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()

        services.registerServiceWithFactory(serviceEntity, () => {
          return new FileLogger('customPath')
        })

        const service: any = application.retrieveServiceFor(serviceEntity)

        expect(service.returnHaHa()).to.eq('ha ha')
      })
    })

    describe(`when the service is registered using .registerServiceWithInterfaceAndFactory`, () => {

      interface Logger2 {}

      class FileLogger2 implements Logger2 {

        constructor (readonly path?: string) {}

        returnMeow (): string {
          return 'meow'
        }
      }

      it(`retrieve the correct instance when the service is retrieved by FileLogger2`, () => {
        const { application, services } = NewApplication()

        services.registerServiceWithInterfaceAndFactory(FileLogger2, 'Logger2', () => {
          return new FileLogger2('customPath')
        })

        const service = application.retrieveServiceFor(FileLogger2)

        expect(service).to.be.instanceOf(FileLogger2)
      })
      it(`returns the correct value from an instance method when the service is retrieved by: FileLogger2`, () => {
        const { application, services } = NewApplication()

        services.registerServiceWithInterfaceAndFactory(FileLogger2, 'Logger2', () => {
          return new FileLogger2('customPath')
        })

        const service: any = application.retrieveServiceFor(FileLogger2)

        expect(service.returnMeow()).to.eq('meow')
      })
      it(`returns the correct constructor value when the service is retrieved by: FileLogger2`, () => {
        const { application, services } = NewApplication()

        services.registerServiceWithInterfaceAndFactory(FileLogger2, 'Logger2', () => {
          return new FileLogger2('customPath')
        })

        const service: any = application.retrieveServiceFor(FileLogger2)

        expect(service.path).to.eq('customPath')
      })
    })

    describe(`when the service is registered using .registerProvider`, () => {
      class LoggerProvider extends BaseProvider implements Provider {
        didBoot () {
          return Promise.resolve()
        }

        register (services: Services) {
          services.registerInstance(new FileLogger())
        }
      }

      const loggerProvider = new LoggerProvider()
      it(`retrieve the correct instance when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()

        services.registerProvider(loggerProvider)

        const service = application.retrieveServiceFor(serviceEntity)

        expect(service).to.be.instanceOf(serviceEntity)
      })
      it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
        const { application, services } = NewApplication()

        services.registerProvider(loggerProvider)

        const service: any = application.retrieveServiceFor(serviceEntity)

        expect(service.returnHaHa()).to.eq('ha ha')
      })
    })
  })
})
