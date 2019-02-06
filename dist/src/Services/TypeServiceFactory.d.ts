import { ServiceFactory } from './ServiceFactory';
import { ApplicationContainer } from '../ApplicationContainer';
export interface ServiceType<U> {
    makeService(str: string): U;
}
export declare class TypeServiceFactory implements ServiceFactory {
    readonly serviceType: any;
    readonly serviceSupports: string[];
    constructor(serviceType: any, serviceSupports?: string[]);
    makeService(container: ApplicationContainer): any;
}
