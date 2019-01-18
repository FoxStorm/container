export interface IServiceFactory {
    readonly serviceType: any;
    readonly serviceSupports: any[];
}
export declare class ServiceFactory implements IServiceFactory {
    readonly serviceType: any;
    readonly serviceSupports: string[];
    constructor(serviceType: any, serviceSupports: string[]);
}
