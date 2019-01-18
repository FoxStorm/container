"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Config_1 = require("../Config");
it('returns an instance of Config', () => {
    const config = new Config_1.Config();
    chai_1.expect(config).to.be.instanceOf(Config_1.Config);
});
//# sourceMappingURL=ConfigSpec.js.map