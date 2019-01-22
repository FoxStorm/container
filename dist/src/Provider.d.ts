import { Services } from './Services/Services';
interface WillBoot {
    willBoot(container: any): Promise<void>;
}
export interface Provider extends WillBoot {
    register(services: Services): void;
    didBoot(container: any): Promise<void>;
}
export declare class BaseProvider implements WillBoot {
    willBoot(container: any): Promise<void>;
}
export {};
