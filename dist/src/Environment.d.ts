export declare class Environment {
    readonly name: string;
    readonly isRelease: boolean;
    static production(): Environment;
    static development(): Environment;
    static testing(): Environment;
    constructor(name: string, isRelease: boolean);
}
