import { ServiceFactory } from './Services/ServiceFactory';
export declare type ConfigPreference = {
    readonly prefer: any;
    readonly for: string;
};
export declare class Config {
    private readonly preferences;
    usePreference(preference: ConfigPreference): void;
    resolveService<T>(fromAvailableServices: ServiceFactory[], serviceInterface: string | T): ServiceFactory;
    private resolveInterfaceName;
}
