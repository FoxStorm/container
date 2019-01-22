import { expect } from 'chai'
import { Config, ConfigPreference } from '../Config'
import { Services } from '../Services/Services'

describe('Config', () => {
  it('returns an instance of Config', () => {
    const config = new Config()
    expect(config).to.be.instanceOf(Config)
  })

  context('.resolveService', () => {
    interface Logger {}
    class PrintLogger implements Logger {}
    class FileLogger implements Logger {}

    const servicesArr: any[] = [PrintLogger, FileLogger]

    it('returns the preferred service', () => {
      const config = new Config()

      const randomService: any = servicesArr[Math.floor(Math.random() * servicesArr.length)]

      const preference: ConfigPreference = { prefer: randomService, for: 'Logger' }
      config.usePreference(preference)

      const services = new Services()
      services.registerInstanceWithInterface(new PrintLogger(), 'Logger')
      services.registerInstanceWithInterface(new FileLogger(), 'Logger')

      expect(config.resolveService(services.factories, 'Logger').serviceType).to.be.eq(randomService)
    })

    it('throws ambiguity, multiple are available', () => {
      const config = new Config()
      const services = new Services()
      services.registerInstanceWithInterface(new PrintLogger(), 'Logger')
      services.registerInstanceWithInterface(new FileLogger(), 'Logger')

      expect(() => config.resolveService(services.factories, 'Logger')).to.throw(
        `Please choose which Logger you prefer, multiple are available: ${servicesArr.map(service => service.name).join(', ')}.`
      )
    })

    it('throws serviceMissing, no service has been registered for a specific interface', () => {
      class ConsoleLogger {}
      const config = new Config()

      const preference: ConfigPreference = { prefer: ConsoleLogger, for: 'Logger' }
      config.usePreference(preference)

      const services = new Services()
      services.registerInstanceWithInterface(new PrintLogger(), 'Logger')
      services.registerInstanceWithInterface(new FileLogger(), 'Logger')

      expect(() => config.resolveService(services.factories, 'Logger')).to.throw(
        `No service ConsoleLogger has been registered for Logger`
      )
    })

    it('throws tooMany, too many services registered for a type', () => {
      const config = new Config()

      const printPreference: ConfigPreference = { prefer: PrintLogger, for: 'Logger' }
      config.usePreference(printPreference)

      const services = new Services()

      services.registerService(PrintLogger)
      services.registerService(PrintLogger)

      expect(() => config.resolveService(services.factories, 'Logger')).to.throw(
        `Too many services registered for this type ${PrintLogger.name}`
      )
    })
  })
})
