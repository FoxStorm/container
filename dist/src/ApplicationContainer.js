"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContainerError_1 = require("./ContainerError");
class ApplicationContainer {
    constructor(config, environment, services) {
        this.config = config;
        this.environment = environment;
        this.services = services;
        this.booted = false;
    }
    retrieveServiceFor(serviceInterface) {
        const interfaceName = this.resolveInterfaceName(serviceInterface);
        const available = this.servicesFor(interfaceName);
        if (available.length > 1) {
            const resolvedPreference = this.config.resolveService(available, serviceInterface);
            return resolvedPreference.serviceType.makeService();
        }
        if (available.length === 0) {
            throw new ContainerError_1.ContainerError('make', `No services available for ${interfaceName}`, [
                `Register a service for ${interfaceName}.`,
                `services.register(${interfaceName}) { ... }.`
            ]);
        }
        return available[0].serviceType.makeService();
    }
    servicesFor(supportedInterface) {
        return this.services.factories.filter(factory => {
            const isTheServiceItself = factory.serviceType.name === supportedInterface;
            const isServiceSupporting = factory.serviceSupports.find(supportedService => supportedService === supportedInterface);
            return isTheServiceItself || isServiceSupporting;
        });
    }
    resolveInterfaceName(serviceInterface) {
        if (typeof serviceInterface === 'string') {
            return serviceInterface;
        }
        return serviceInterface.name;
    }
}
exports.ApplicationContainer = ApplicationContainer;
//# sourceMappingURL=ApplicationContainer.js.map