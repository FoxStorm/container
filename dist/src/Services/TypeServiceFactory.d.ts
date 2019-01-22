import { ServiceFactory } from './ServiceFactory';
export interface ServiceType<U> {
    makeService(str: string): U;
}
export declare class TypeServiceFactory implements ServiceFactory {
    readonly serviceType: any;
    readonly serviceSupports: any[];
    constructor(serviceType: any);
    makeService(): any;
}
