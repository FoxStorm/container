import { Environment } from './Environment';
import { Services } from './Services/Services';
import { Config } from './Config';
export interface Container {
    readonly config: Config;
    readonly environment: Environment;
    readonly services: Services;
    readonly booted: boolean;
    retrieveServiceFor<T>(serviceInterface: string | (new (...args: any[]) => T)): T;
}
export declare class ApplicationContainer implements Container {
    readonly config: Config;
    readonly environment: Environment;
    readonly services: Services;
    readonly booted: boolean;
    constructor(config: Config, environment: Environment, services: Services);
    retrieveServiceFor<T>(serviceInterface: string | (new (...args: any[]) => T)): T;
    private servicesFor;
    private resolveInterfaceName;
}
