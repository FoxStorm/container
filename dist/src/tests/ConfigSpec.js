"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Config_1 = require("../Config");
const Services_1 = require("../Services/Services");
describe('Config', () => {
    it('returns an instance of Config', () => {
        const config = new Config_1.Config();
        chai_1.expect(config).to.be.instanceOf(Config_1.Config);
    });
    context('.resolveService', () => {
        class PrintLogger {
        }
        class FileLogger {
        }
        const servicesArr = [PrintLogger, FileLogger];
        it('returns the preferred service', () => {
            const config = new Config_1.Config();
            const randomService = servicesArr[Math.floor(Math.random() * servicesArr.length)];
            const preference = { prefer: randomService, for: 'Logger' };
            config.usePreference(preference);
            const services = new Services_1.Services();
            services.registerInstanceWithInterface(new PrintLogger(), 'Logger');
            services.registerInstanceWithInterface(new FileLogger(), 'Logger');
            chai_1.expect(config.resolveService(services.factories, 'Logger').serviceType).to.be.eq(randomService);
        });
        it('throws ambiguity, multiple are available', () => {
            const config = new Config_1.Config();
            const services = new Services_1.Services();
            services.registerInstanceWithInterface(new PrintLogger(), 'Logger');
            services.registerInstanceWithInterface(new FileLogger(), 'Logger');
            chai_1.expect(() => config.resolveService(services.factories, 'Logger')).to.throw(`Please choose which Logger you prefer, multiple are available: ${servicesArr.map(service => service.name).join(', ')}.`);
        });
        it('throws serviceMissing, no service has been registered for a specific interface', () => {
            class ConsoleLogger {
            }
            const config = new Config_1.Config();
            const preference = { prefer: ConsoleLogger, for: 'Logger' };
            config.usePreference(preference);
            const services = new Services_1.Services();
            services.registerInstanceWithInterface(new PrintLogger(), 'Logger');
            services.registerInstanceWithInterface(new FileLogger(), 'Logger');
            chai_1.expect(() => config.resolveService(services.factories, 'Logger')).to.throw(`No service ConsoleLogger has been registered for Logger`);
        });
        it('throws tooMany, too many services registered for a type', () => {
            const config = new Config_1.Config();
            const printPreference = { prefer: PrintLogger, for: 'Logger' };
            config.usePreference(printPreference);
            const services = new Services_1.Services();
            services.registerService(PrintLogger);
            services.registerService(PrintLogger);
            chai_1.expect(() => config.resolveService(services.factories, 'Logger')).to.throw(`Too many services registered for this type ${PrintLogger.name}`);
        });
    });
});
//# sourceMappingURL=ConfigSpec.js.map