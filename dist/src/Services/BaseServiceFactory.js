"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseServiceFactory {
    constructor(serviceType, serviceSupports, closure) {
        this.serviceType = serviceType;
        this.serviceSupports = serviceSupports;
        this.closure = closure;
    }
    makeService(container) {
        try {
            return this.closure(container);
        }
        catch (_a) {
            throw new Error();
        }
    }
}
exports.BaseServiceFactory = BaseServiceFactory;
//# sourceMappingURL=BaseServiceFactory.js.map