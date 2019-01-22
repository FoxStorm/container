"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServicesError extends Error {
    constructor(typeIdentifier, reason, suggestedFixes = [], possibleCauses = []) {
        super(reason);
        this.typeIdentifier = typeIdentifier;
        this.reason = reason;
        this.suggestedFixes = suggestedFixes;
        this.possibleCauses = possibleCauses;
        this.readableName = 'Framework Error';
    }
}
exports.ServicesError = ServicesError;
//# sourceMappingURL=ServicesError.js.map