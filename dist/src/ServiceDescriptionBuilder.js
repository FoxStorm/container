"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceDescriptionBuilder {
    constructor() {
        this.description = [];
    }
    withServices(factories) {
        this.description.push('Services: ');
        if (factories.length === 0) {
            this.description.push('- none');
        }
        else {
            factories.forEach(factory => {
                if (factory.serviceSupports.length > 0) {
                    this.description.push(`- ${factory.serviceType}`);
                }
                else {
                    const interfaces = factory.serviceSupports.map((service) => `${service}`).join(', ');
                    this.description.push(`- ${factory.serviceType}: ${interfaces}`);
                }
            });
        }
        return this;
    }
    withProviders(providers) {
        this.description.push('Providers: ');
        if (providers.length === 0) {
            this.description.push('- none');
        }
        else {
            providers.forEach(provider => {
                this.description.push(`- ${provider}`);
            });
        }
        return this;
    }
    build() {
        this.description.join('\n');
    }
}
exports.ServiceDescriptionBuilder = ServiceDescriptionBuilder;
//# sourceMappingURL=ServiceDescriptionBuilder.js.map