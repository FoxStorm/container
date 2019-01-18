"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
    constructor(name, isRelease) {
        this.name = name;
        this.isRelease = isRelease;
    }
    // An environment for deploying your application to production.
    static production() {
        return new this('production', true);
    }
    /// An environment for developing your application.
    static development() {
        return new this('development', false);
    }
    /// An environment for testing your application.
    static testing() {
        return new this('testing', false);
    }
}
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map