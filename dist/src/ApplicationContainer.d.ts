import { Environment } from './Environment';
import { Services } from './Services';
import { Config } from './Config';
import { Service } from './Service';
export interface Container {
    readonly config: Config;
    readonly environment: Environment;
    readonly services: Services;
    readonly booted: boolean;
    retrieveServiceFor(serviceInterface: string): Service;
}
export declare class ApplicationContainer implements Container {
    readonly config: Config;
    readonly environment: Environment;
    readonly services: Services;
    readonly booted: boolean;
    constructor(config: Config, environment: Environment, services: Services);
    retrieveServiceFor<T>(serviceInterface: string | (new () => T)): T;
    private servicesFor;
    private resolveInterfaceName;
}
