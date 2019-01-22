import { Container } from '../ApplicationContainer';
import { ServiceFactory } from './ServiceFactory';
export declare class BaseServiceFactory implements ServiceFactory {
    readonly serviceType: any;
    readonly serviceSupports: string[];
    readonly closure: (container: Container) => any;
    constructor(serviceType: any, serviceSupports: string[], closure: (container: Container) => any);
    makeService(container: Container): any;
}
