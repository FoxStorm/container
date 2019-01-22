"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServicesError_1 = require("./Services/ServicesError");
class Config {
    constructor() {
        this.preferences = [];
    }
    usePreference(preference) {
        this.preferences.push(preference);
    }
    resolveService(fromAvailableServices, serviceInterface) {
        const foundPreference = this.preferences.find(preference => preference.for === serviceInterface);
        if (!foundPreference) {
            throw new ServicesError_1.ServicesError('ambiguity', `Please choose which ${this.resolveInterfaceName(serviceInterface)} you prefer, multiple are ` +
                `available: ${fromAvailableServices.map(service => service.serviceType.name).join(', ')}.`);
        }
        const fromAvailable = fromAvailableServices.filter(service => foundPreference.prefer === service.serviceType);
        if (fromAvailable.length === 0) {
            throw new ServicesError_1.ServicesError('resolveService', `No service ${foundPreference.prefer.name} has been registered for ${serviceInterface}`);
        }
        else if (fromAvailable.length > 1) {
            throw new ServicesError_1.ServicesError('resolveService', `Too many services registered for this type ${foundPreference.prefer.name}.`);
        }
        return fromAvailable[0];
    }
    resolveInterfaceName(serviceInterface) {
        if (typeof serviceInterface === 'string') {
            return serviceInterface;
        }
        return serviceInterface.name;
    }
}
exports.Config = Config;
//# sourceMappingURL=Config.js.map