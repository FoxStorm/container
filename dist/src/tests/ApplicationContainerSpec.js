"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Config_1 = require("../Config");
const Environment_1 = require("../Environment");
const Services_1 = require("../Services/Services");
const ApplicationContainer_1 = require("../ApplicationContainer");
const Provider_1 = require("../Provider");
describe('ApplicationContainer', () => {
    class FakeFileLogger {
        constructor(path) {
            this.path = path;
        }
        static makeService() {
            return new this('/default/path/app.log');
        }
        returnHaHa() {
            return 'ha ha';
        }
    }
    class FakeLoggerProvider extends Provider_1.BaseProvider {
        didBoot() {
            return Promise.resolve();
        }
        register(services) {
            services.registerInstance(new FakeFileLogger());
        }
    }
    class ConsoleLogger {
        constructor(path) {
            this.path = path;
        }
        returnMeow() {
            return 'meow';
        }
    }
    const NewApplication = (customConfig) => {
        const environment = Environment_1.Environment.development();
        const config = customConfig || new Config_1.Config();
        const services = new Services_1.Services();
        const application = new ApplicationContainer_1.ApplicationContainer(config, environment, services);
        return { services, application };
    };
    describe('Initializes the class with correct params', () => {
        it('returns an instance of ApplicationContainer', () => {
            const { application } = NewApplication();
            chai_1.expect(application).to.be.instanceOf(ApplicationContainer_1.ApplicationContainer);
        });
    });
    describe('.retrieveServiceFor', () => {
        const serviceEntity = FakeFileLogger;
        const serviceInstance = new serviceEntity();
        const interfaceEntity = 'FakeLogger';
        const servicesConfig = {
            service: { entity: serviceEntity, str: 'FakeFileLogger' },
            interface: { entity: interfaceEntity, str: 'FakeLogger' }
        };
        for (const entityType in servicesConfig) {
            const configService = servicesConfig[entityType];
            describe('when there is no service registered', () => {
                it(`throws an error when it tries to retrieve a service by ${entityType}`, () => {
                    const { application } = NewApplication();
                    chai_1.expect(() => application.retrieveServiceFor(configService.entity)).to.throw(`No services available for ${configService.str}`);
                });
            });
            describe(`when the service is registered using .registerInstanceWithInterface`, () => {
                it(`retrieves the correct instance when the service is retrieved by ${entityType}`, () => {
                    const { application, services } = NewApplication();
                    services.registerInstanceWithInterface(serviceInstance, interfaceEntity);
                    const service = application.retrieveServiceFor(configService.entity);
                    chai_1.expect(service).to.be.instanceOf(serviceEntity);
                });
                it(`returns the correct value from an instance method when the service is retrieved by ${entityType}`, () => {
                    const { application, services } = NewApplication();
                    services.registerInstanceWithInterface(serviceInstance, interfaceEntity);
                    const service = application.retrieveServiceFor(configService.entity);
                    chai_1.expect(service.returnHaHa()).to.eq('ha ha');
                });
            });
            describe(`when the service is registered using .registerInstanceWithInterfaces`, () => {
                it(`retrieves the correct instance when the service is retrieved by ${entityType}`, () => {
                    const { application, services } = NewApplication();
                    services.registerInstanceWithInterfaces(serviceInstance, [interfaceEntity]);
                    const service = application.retrieveServiceFor(configService.entity);
                    chai_1.expect(service).to.be.instanceOf(serviceEntity);
                });
                it(`returns the correct value from an instance method when the service is retrieved by ${entityType}`, () => {
                    const { application, services } = NewApplication();
                    services.registerInstanceWithInterfaces(serviceInstance, [interfaceEntity]);
                    const service = application.retrieveServiceFor(configService.entity);
                    chai_1.expect(service.returnHaHa()).to.eq('ha ha');
                });
            });
        }
        describe(`when the service is registered using .registerInstance`, () => {
            it(`retrieve the correct instance when the service is retrieved by ${serviceEntity.name}`, () => {
                const { application, services } = NewApplication();
                services.registerInstance(serviceInstance);
                const service = application.retrieveServiceFor(serviceEntity);
                chai_1.expect(service).to.be.instanceOf(serviceEntity);
            });
            it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
                const { application, services } = NewApplication();
                services.registerInstance(serviceInstance);
                const service = application.retrieveServiceFor(serviceEntity.name);
                chai_1.expect(service.returnHaHa()).to.eq('ha ha');
            });
        });
        describe(`when the service is registered using .registerService`, () => {
            it(`retrieve the correct instance when the service is retrieved by ${serviceEntity.name}`, () => {
                const { application, services } = NewApplication();
                services.registerService(serviceEntity);
                const service = application.retrieveServiceFor(serviceEntity);
                chai_1.expect(service).to.be.instanceOf(serviceEntity);
            });
            it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
                const { application, services } = NewApplication();
                services.registerService(serviceEntity);
                const service = application.retrieveServiceFor(serviceEntity);
                chai_1.expect(service.returnHaHa()).to.eq('ha ha');
            });
        });
        describe(`when the service is registered using .registerServiceWithFactory`, () => {
            it(`retrieve the correct instance when the service is retrieved by ${serviceEntity.name}`, () => {
                const { application, services } = NewApplication();
                services.registerServiceWithFactory(serviceEntity, () => {
                    return new FakeFileLogger('customPath');
                });
                const service = application.retrieveServiceFor(serviceEntity);
                chai_1.expect(service).to.be.instanceOf(serviceEntity);
            });
            it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
                const { application, services } = NewApplication();
                services.registerServiceWithFactory(serviceEntity, () => {
                    return new FakeFileLogger('customPath');
                });
                const service = application.retrieveServiceFor(serviceEntity);
                chai_1.expect(service.returnHaHa()).to.eq('ha ha');
            });
        });
        describe(`when the service is registered using .registerServiceWithInterfaceAndFactory`, () => {
            it(`retrieve the correct instance when the service is retrieved by the service`, () => {
                const { application, services } = NewApplication();
                services.registerServiceWithInterfaceAndFactory(ConsoleLogger, 'FakeConsole', () => {
                    return new ConsoleLogger('customPath');
                });
                const service = application.retrieveServiceFor(ConsoleLogger);
                chai_1.expect(service).to.be.instanceOf(ConsoleLogger);
            });
            it(`returns the correct value from an instance method when the service is retrieved by the service`, () => {
                const { application, services } = NewApplication();
                services.registerServiceWithInterfaceAndFactory(ConsoleLogger, 'FakeConsole', () => {
                    return new ConsoleLogger('customPath');
                });
                const service = application.retrieveServiceFor(ConsoleLogger);
                chai_1.expect(service.returnMeow()).to.eq('meow');
            });
            it(`returns the correct constructor value when the service is retrieved by the service`, () => {
                const { application, services } = NewApplication();
                services.registerServiceWithInterfaceAndFactory(ConsoleLogger, 'FakeConsole', () => {
                    return new ConsoleLogger('customPath');
                });
                const service = application.retrieveServiceFor(ConsoleLogger);
                chai_1.expect(service.path).to.eq('customPath');
            });
        });
        describe(`when the service is registered using .registerInterfaceAndFactory`, () => {
            it(`retrieve the correct instance when the service is retrieved by an interface`, () => {
                const { application, services } = NewApplication();
                services.registerInterfaceAndFactory('FakeConsole', () => {
                    return new ConsoleLogger('customPath');
                });
                const service = application.retrieveServiceFor('FakeConsole');
                chai_1.expect(service).to.be.instanceOf(ConsoleLogger);
            });
            it(`returns the correct value from an instance method when the service is retrieved by an interface`, () => {
                const { application, services } = NewApplication();
                services.registerInterfaceAndFactory('FakeConsole', () => {
                    return new ConsoleLogger('customPath');
                });
                const service = application.retrieveServiceFor('FakeConsole');
                chai_1.expect(service.returnMeow()).to.eq('meow');
            });
            it(`returns the correct constructor value when the service is retrieved by an interface`, () => {
                const { application, services } = NewApplication();
                services.registerInterfaceAndFactory('FakeConsole', () => {
                    return new ConsoleLogger('customPath');
                });
                const service = application.retrieveServiceFor('FakeConsole');
                chai_1.expect(service.path).to.eq('customPath');
            });
        });
        describe(`when the service is registered using .registerServiceWithInterface`, () => {
            it(`retrieve the correct instance when the service is retrieved by an interface`, () => {
                const { application, services } = NewApplication();
                services.registerServiceWithInterface(FakeFileLogger, 'FakeLogger');
                const service = application.retrieveServiceFor('FakeLogger');
                chai_1.expect(service).to.be.instanceOf(FakeFileLogger);
            });
            it(`returns the correct value from an instance method when the service is retrieved by an interface`, () => {
                const { application, services } = NewApplication();
                services.registerServiceWithInterface(FakeFileLogger, 'FakeLogger');
                const service = application.retrieveServiceFor('FakeLogger');
                chai_1.expect(service.returnHaHa()).to.eq('ha ha');
            });
            it(`returns the correct constructor value when the service is retrieved by an interface`, () => {
                const { application, services } = NewApplication();
                services.registerInterfaceAndFactory('FakeConsole', () => {
                    return new ConsoleLogger('customPath');
                });
                const service = application.retrieveServiceFor('FakeConsole');
                chai_1.expect(service.path).to.eq('customPath');
            });
        });
        describe(`when the service is registered using .registerServiceWithInterfaces`, () => {
            it(`retrieve the correct instance when the service is retrieved by an interface`, () => {
                const { application, services } = NewApplication();
                services.registerServiceWithInterfaces(FakeFileLogger, ['FakeLogger', 'ErrorLogger']);
                const service = application.retrieveServiceFor('ErrorLogger');
                chai_1.expect(service).to.be.instanceOf(FakeFileLogger);
            });
            it(`returns the correct value from an instance method when the service is retrieved by an interface`, () => {
                const { application, services } = NewApplication();
                services.registerServiceWithInterfaces(FakeFileLogger, ['FakeLogger', 'ErrorLogger']);
                const service = application.retrieveServiceFor('ErrorLogger');
                chai_1.expect(service.returnHaHa()).to.eq('ha ha');
            });
            it(`returns the correct constructor value when the service is retrieved by an interface`, () => {
                const { application, services } = NewApplication();
                services.registerInterfaceAndFactory('FakeConsole', () => {
                    return new ConsoleLogger('customPath');
                });
                const service = application.retrieveServiceFor('FakeConsole');
                chai_1.expect(service.path).to.eq('customPath');
            });
        });
        describe(`when the service is registered using .registerProvider`, () => {
            it(`retrieve the correct instance when the service is retrieved by ${serviceEntity.name}`, () => {
                const { application, services } = NewApplication();
                const loggerProvider = new FakeLoggerProvider();
                services.registerProvider(loggerProvider);
                const service = application.retrieveServiceFor(serviceEntity);
                chai_1.expect(service).to.be.instanceOf(serviceEntity);
            });
            it(`returns the correct value from an instance method when the service is retrieved by ${serviceEntity.name}`, () => {
                const { application, services } = NewApplication();
                const loggerProvider = new FakeLoggerProvider();
                services.registerProvider(loggerProvider);
                const service = application.retrieveServiceFor(serviceEntity);
                chai_1.expect(service.returnHaHa()).to.eq('ha ha');
            });
        });
    });
});
//# sourceMappingURL=ApplicationContainerSpec.js.map