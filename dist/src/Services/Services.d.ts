import { BaseServiceFactory } from './BaseServiceFactory';
import { Provider } from '../Provider';
import { Container } from '../ApplicationContainer';
import { ServiceFactory } from './ServiceFactory';
export interface ServicesRegistrar {
    registerInstance<S>(instance: S): void;
    registerInstanceWithInterface<S>(instance: S, supportedInterface: string): void;
    registerInstanceWithInterfaces<S>(instance: S, supportedInterfaces: string[]): void;
    registerServiceWithFactory<S>(serviceType: (new (...args: any[]) => S), factory: (container: Container) => S): void;
    registerServiceWithInterfaceAndFactory<S>(serviceType: (new (...args: any[]) => S), supportedInterface: string, factory: (container: Container) => S): void;
    registerServiceWithInterfacesAndFactory<S>(serviceType: (new (...args: any[]) => S), supportedInterface: string[], factory: (container: Container) => S): void;
    registerInterfaceAndFactory<S>(supportedInterface: string, factory: (container: Container) => S): void;
    registerService<S>(serviceType: (new (...args: any[]) => S)): void;
    registerServiceWithInterface<S>(serviceType: (new (...args: any[]) => S), supportedInterface: string): void;
    registerServiceWithInterfaces<S>(serviceType: (new (...args: any[]) => S), supportedInterfaces: string[]): void;
    registerProvider(provider: Provider): void;
    registerFactory(factory: BaseServiceFactory): void;
    description(): string;
}
export declare class Services implements ServicesRegistrar {
    readonly factories: ServiceFactory[];
    readonly providers: Provider[];
    registerInstance<S>(instance: S): void;
    registerInstanceWithInterface<S>(instance: S, supportedInterface: string): void;
    registerInstanceWithInterfaces<S>(instance: S, supportedInterfaces: string[]): void;
    registerServiceWithFactory<S>(serviceType: (new (...args: any[]) => S), factory: (container: Container) => S): void;
    registerServiceWithInterfaceAndFactory<S>(serviceType: (new (...args: any[]) => S), supportedInterface: string, factory: (container: Container) => S): void;
    registerServiceWithInterfacesAndFactory<S>(serviceType: (new (...args: any[]) => S), supportedInterfaces: string[], factory: (container: Container) => S): void;
    registerInterfaceAndFactory<S>(supportedInterface: string, factory: (container: Container) => S): void;
    registerService<S>(serviceType: (new (...args: any[]) => S)): void;
    registerServiceWithInterface<S>(serviceType: (new (...args: any[]) => S), supportedInterface: string): void;
    registerServiceWithInterfaces<S>(serviceType: (new (...args: any[]) => S), supportedInterfaces: string[]): void;
    registerProvider(provider: Provider): void;
    registerFactory(factory: ServiceFactory): void;
    description(): string;
}
