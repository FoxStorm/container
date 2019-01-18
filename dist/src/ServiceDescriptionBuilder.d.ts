import { ServiceFactory } from './ServiceFactory';
import { Provider } from './Provider';
export declare class ServiceDescriptionBuilder {
    readonly description: string[];
    withServices(factories: ServiceFactory[]): this;
    withProviders(providers: Provider[]): this;
    build(): void;
}
