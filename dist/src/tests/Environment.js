"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Environment_1 = require("../Environment");
it('returns an instance of production Environment', () => {
    const productionEnvironment = Environment_1.Environment.production();
    chai_1.expect(productionEnvironment.name).to.be.eq('production');
});
it('returns an instance of development Environment', () => {
    const developmentEnvironment = Environment_1.Environment.development();
    chai_1.expect(developmentEnvironment.name).to.be.eq('development');
});
it('returns an instance of testing Environment', () => {
    const testingEnvironment = Environment_1.Environment.testing();
    chai_1.expect(testingEnvironment.name).to.be.eq('testing');
});
//# sourceMappingURL=Environment.js.map