import { Provider } from '../Provider';
import { ServiceFactory } from './ServiceFactory';
export declare class ServiceDescriptionBuilder {
    readonly description: string[];
    withServices(factories: ServiceFactory[]): this;
    withProviders(providers: Provider[]): this;
    build(): string;
}
