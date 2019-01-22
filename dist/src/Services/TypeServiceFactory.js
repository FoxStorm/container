"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeServiceFactory {
    constructor(serviceType) {
        this.serviceType = serviceType;
        this.serviceSupports = [];
    }
    makeService() {
        try {
            return this.serviceType.makeService();
        }
        catch (_a) {
            throw new Error();
        }
    }
}
exports.TypeServiceFactory = TypeServiceFactory;
//# sourceMappingURL=TypeServiceFactory.js.map