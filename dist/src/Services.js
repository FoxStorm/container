"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceFactory_1 = require("./ServiceFactory");
const ServiceDescriptionBuilder_1 = require("./ServiceDescriptionBuilder");
class Services {
    constructor() {
        this.factories = [];
        this.providers = [];
    }
    registerWithInterface(service, serviceInterface) {
        const factory = new ServiceFactory_1.ServiceFactory(service, [serviceInterface]);
        this.registerFactoryWithInterface(factory);
    }
    registerWithInterfaces(service, serviceInterface) {
        const factory = new ServiceFactory_1.ServiceFactory(service, serviceInterface);
        this.registerFactoryWithInterface(factory);
    }
    register(service) {
        const factory = new ServiceFactory_1.ServiceFactory(service, []);
        this.registerFactoryWithInterface(factory);
    }
    registerFactoryWithInterface(factory) {
        const existing = this.factories.indexOf(factory);
        if (existing) {
            this.factories[existing] = factory;
        }
        this.factories.push(factory);
    }
    description() {
        new ServiceDescriptionBuilder_1.ServiceDescriptionBuilder()
            .withServices(this.factories)
            .withProviders(this.providers)
            .build();
    }
}
exports.Services = Services;
//# sourceMappingURL=Services.js.map