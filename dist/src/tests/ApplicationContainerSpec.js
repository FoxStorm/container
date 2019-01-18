"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Config_1 = require("../Config");
const Environment_1 = require("../Environment");
const Services_1 = require("../Services");
const ApplicationContainer_1 = require("../ApplicationContainer");
describe('ApplicationContainer', () => {
    const NewApplication = () => {
        const environment = Environment_1.Environment.development();
        const config = new Config_1.Config();
        const services = new Services_1.Services();
        const application = new ApplicationContainer_1.ApplicationContainer(config, environment, services);
        return { services, application };
    };
    describe('Initializes the class with correct params', () => {
        it('returns an instance of ApplicationContainer', () => {
            const { application } = NewApplication();
            chai_1.expect(application).to.be.instanceOf(ApplicationContainer_1.ApplicationContainer);
        });
    });
    describe('.retrieveServiceFor', () => {
        class PrintLogger {
            static makeService() {
                return new this();
            }
            sayHaHa() {
                return 'jaja';
            }
        }
        const serviceEntity = PrintLogger;
        const interfaceEntity = 'Logger';
        const servicesConfig = {
            service: { entity: serviceEntity, str: 'PrintLogger' },
            interface: { entity: interfaceEntity, str: 'Logger' }
        };
        for (const serviceEntityType in servicesConfig) {
            const configService = servicesConfig[serviceEntityType];
            describe('failing cases', () => {
                it(`throws an error as there is no service registered using ${serviceEntityType}`, () => {
                    const { application } = NewApplication();
                    chai_1.expect(() => application.retrieveServiceFor(configService.entity)).to.throw(`No services available for ${configService.str}`);
                });
            });
            describe('success cases', () => {
                describe(`when the service is retrieved using a service with an interface`, () => {
                    it(`retrieve the correct service instance when the retriever receives ${serviceEntityType}`, () => {
                        const { application, services } = NewApplication();
                        services.registerWithInterface(serviceEntity, interfaceEntity);
                        const service = application.retrieveServiceFor(configService.entity);
                        chai_1.expect(service).to.be.instanceOf(serviceEntity);
                    });
                    it(`returns the correct value from an instance method of the service when the service is retrieved using ${serviceEntityType}`, () => {
                        const { application, services } = NewApplication();
                        services.registerWithInterface(serviceEntity, interfaceEntity);
                        const service = application.retrieveServiceFor(configService.entity);
                        chai_1.expect(service.sayHaHa()).to.eq('jaja');
                    });
                });
                describe(`when the service is registered using a service`, () => {
                    it(`retrieve the correct service instance when the retriever receives ${serviceEntityType}`, () => {
                        const { application, services } = NewApplication();
                        services.register(serviceEntity);
                        const service = application.retrieveServiceFor(serviceEntity);
                        chai_1.expect(service).to.be.instanceOf(serviceEntity);
                    });
                    it(`returns the correct value from an instance method of the service when the service is retrieved using ${serviceEntityType}`, () => {
                        const { application, services } = NewApplication();
                        services.register(serviceEntity);
                        const service = application.retrieveServiceFor(serviceEntity);
                        chai_1.expect(service.sayHaHa()).to.eq('jaja');
                    });
                });
            });
        }
    });
});
//# sourceMappingURL=ApplicationContainerSpec.js.map