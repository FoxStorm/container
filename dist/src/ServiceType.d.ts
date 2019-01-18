interface ServiceSupportable {
    readonly serviceSupports: any[];
}
export interface ServiceType<U> {
    makeService(str: string): U;
}
export declare class BaseServiceType implements ServiceSupportable {
    readonly serviceSupports: any[];
}
export {};
