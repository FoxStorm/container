"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServicesError_1 = require("./ServicesError");
class TypeServiceFactory {
    constructor(serviceType, serviceSupports = []) {
        this.serviceType = serviceType;
        this.serviceSupports = serviceSupports;
    }
    makeService(container) {
        if (this.serviceType.makeService === undefined) {
            throw new ServicesError_1.ServicesError('serviceRegister', `${this.serviceType} does not implement makeService method`);
        }
        try {
            return this.serviceType.makeService(container);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.TypeServiceFactory = TypeServiceFactory;
//# sourceMappingURL=TypeServiceFactory.js.map