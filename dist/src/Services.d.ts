import { ServiceFactory } from './ServiceFactory';
import { Provider } from './Provider';
import { ServiceType } from './ServiceType';
export declare class Services {
    readonly factories: ServiceFactory[];
    readonly providers: Provider[];
    registerWithInterface<S>(service: ServiceType<S>, serviceInterface: string): void;
    registerWithInterfaces<S>(service: ServiceType<S>, serviceInterface: string[]): void;
    register<S>(service: ServiceType<S>): void;
    registerFactoryWithInterface(factory: ServiceFactory): void;
    description(): void;
}
