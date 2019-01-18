"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            throw new Error('');
        }
        const fromAvailable = fromAvailableServices.filter(service => foundPreference.for === service.serviceType);
        if (fromAvailable.length === 0) {
            throw new Error('None found');
        }
        else if (fromAvailable.length > 1) {
            throw new Error('Too Many found');
        }
        return fromAvailable[0];
    }
}
exports.Config = Config;
//# sourceMappingURL=Config.js.map