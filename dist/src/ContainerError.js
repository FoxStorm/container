"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerError extends Error {
    // public readonly sourceLocation: SourceLocation
    // public readonly stackTrace: string[]
    constructor(typeIdentifier, reason, suggestedFixes = [], possibleCauses = []) {
        super(reason);
        this.typeIdentifier = typeIdentifier;
        this.reason = reason;
        this.suggestedFixes = suggestedFixes;
        this.possibleCauses = possibleCauses;
        this.readableName = 'Framework Error';
        // this.sourceLocation = this.makeSourceLocation()
        // this.stackTrace = this.makeStackTrace()
    }
}
exports.ContainerError = ContainerError;
//# sourceMappingURL=ContainerError.js.map