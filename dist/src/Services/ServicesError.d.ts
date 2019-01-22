export declare class ServicesError extends Error {
    readonly typeIdentifier: string;
    readonly reason: string;
    readonly suggestedFixes: string[];
    readonly possibleCauses: string[];
    readonly readableName: string;
    constructor(typeIdentifier: string, reason: string, suggestedFixes?: string[], possibleCauses?: string[]);
}
