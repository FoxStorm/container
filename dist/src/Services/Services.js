"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseServiceFactory_1 = require("./BaseServiceFactory");
const ServiceDescriptionBuilder_1 = require("./ServiceDescriptionBuilder");
const TypeServiceFactory_1 = require("./TypeServiceFactory");
const ServicesError_1 = require("./ServicesError");
class Services {
    constructor() {
        this.factories = [];
        this.providers = [];
    }
    // INSTANCE
    // Registers a pre-initialized instance of a `Service`.
    // services.registerInstance(new PrintLogger())
    registerInstance(instance) {
        this.registerInstanceWithInterfaces(instance, []);
    }
    // Registers a pre-initialized instance of a `Service` conforming to a single interface.
    // services.registerInstanceWithInterface(new PrintLogger(), 'Logger')
    registerInstanceWithInterface(instance, supportedInterface) {
        this.registerInstanceWithInterfaces(instance, [supportedInterface]);
    }
    // Registers a pre-initialized instance of a `Service` conforming to zero or many interfaces.
    // services.registerInstanceWithInterfaces(new PrintLogger(), [ 'Logger', 'ErrorLogger' ])
    registerInstanceWithInterfaces(instance, supportedInterfaces) {
        const serviceFactory = new BaseServiceFactory_1.BaseServiceFactory(instance.constructor, supportedInterfaces, () => {
            return instance;
        });
        this.registerFactory(serviceFactory);
    }
    // FACTORY
    // Registers a `Service` creating closure (service factory).
    // services.registerInterfaceWithFactory(PrintLogger, () => {
    //   return new PrintLogger()
    // })
    registerServiceWithFactory(serviceType, factory) {
        const serviceFactory = new BaseServiceFactory_1.BaseServiceFactory(serviceType, [], (container) => {
            try {
                return factory(container);
            }
            catch (_a) {
                throw new ServicesError_1.ServicesError('registerServiceWithFactory', 'Error executing factory');
            }
        });
        this.registerFactory(serviceFactory);
    }
    // Registers a `Service` creating closure (service factory) conforming to a single interface.
    // services.registerInterfaceWithFactory(PrintLogger, 'Logger', () => {
    //   return new PrintLogger()
    // })
    registerServiceWithInterfaceAndFactory(serviceType, supportedInterface, factory) {
        const serviceFactory = new BaseServiceFactory_1.BaseServiceFactory(serviceType, [supportedInterface], (container) => {
            try {
                return factory(container);
            }
            catch (_a) {
                throw new ServicesError_1.ServicesError('registerServiceWithInterfaceAndFactory', 'Error executing factory');
            }
        });
        this.registerFactory(serviceFactory);
    }
    // Registers a `Service` creating closure (service factory) conforming to zero or many interfaces.
    // services.registerInterfaceWithFactory(PrintLogger, [ 'Logger', 'ErrorLogger' ], () => {
    //   return new PrintLogger()
    // })
    registerServiceWithInterfacesAndFactory(serviceType, supportedInterfaces, factory) {
        const serviceFactory = new BaseServiceFactory_1.BaseServiceFactory(serviceType, supportedInterfaces, (container) => {
            try {
                return factory(container);
            }
            catch (_a) {
                throw new ServicesError_1.ServicesError('registerServiceWithInterfacesAndFactory', 'Error executing factory');
            }
        });
        this.registerFactory(serviceFactory);
    }
    // Registers a `Service` creating closure (service factory) conforming to zero or many interfaces.
    // services.registerInterfaceAndFactory('Logger', () => {
    //   return new PrintLogger()
    // })
    registerInterfaceAndFactory(supportedInterface, factory) {
        const serviceFactory = new BaseServiceFactory_1.BaseServiceFactory(supportedInterface, [supportedInterface], (container) => {
            try {
                return factory(container);
            }
            catch (_a) {
                throw new ServicesError_1.ServicesError('registerInterfaceAndFactory', 'Error executing factory');
            }
        });
        this.registerFactory(serviceFactory);
    }
    // TYPE
    // Registers a `ServiceType` to the `Services`. This is the most concise register method since the `ServiceType`
    // services.registerService(PrintLogger)
    registerService(serviceType) {
        const serviceFactory = new TypeServiceFactory_1.TypeServiceFactory(serviceType);
        this.registerFactory(serviceFactory);
    }
    // PROVIDER
    // Registers a `Provider` to the services. This will automatically register all of the `Provider`'s available
    // try  { services.registerProvider(new PrintLoggerProvider()) } catch { }
    registerProvider(provider) {
        const foundProvider = this.providers.find(existingProvider => typeof existingProvider === typeof provider);
        if (!foundProvider) {
            try {
                provider.register(this);
            }
            catch ( /* */_a) { /* */ }
            this.providers.push(provider);
        }
    }
    // CUSTOM
    //  Registers any type conforming to `ServiceFactory`. This method should only be used when implementing custom
    registerFactory(factory) {
        const existing = this.factories.indexOf(factory);
        if (existing) {
            this.factories[existing] = factory;
        }
        this.factories.push(factory);
    }
    description() {
        return new ServiceDescriptionBuilder_1.ServiceDescriptionBuilder()
            .withServices(this.factories)
            .withProviders(this.providers)
            .build();
    }
}
exports.Services = Services;
//# sourceMappingURL=Services.js.map