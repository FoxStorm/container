import { ServiceFactory } from './ServiceFactory';
export declare type ConfigPreference = {
    readonly prefer: any;
    readonly for: string;
};
export declare class Config {
    readonly preferences: ConfigPreference[];
    usePreference(preference: ConfigPreference): void;
    resolveService<T>(fromAvailableServices: ServiceFactory[], serviceInterface: string | (new () => T)): ServiceFactory;
}
