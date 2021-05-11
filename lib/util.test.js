"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_level_type_1 = require("./log-level-type");
const util_1 = require("./util");
const chai_1 = require("chai");
describe('util', () => {
    ;
    [
        [log_level_type_1.LogLevelType.DEBUG, 'log'],
        [log_level_type_1.LogLevelType.INFO, 'info'],
        [log_level_type_1.LogLevelType.WARN, 'warn'],
        [log_level_type_1.LogLevelType.ERROR, 'error'],
    ].forEach(([type, result]) => {
        it(`should return ${result} for log level type ${type}`, () => {
            chai_1.expect(util_1.util.logTypeToFunction(type)).to.eq(result);
        });
    });
    it('should throw error if wront type passed', () => {
        try {
            util_1.util.logTypeToFunction('dummyType');
            chai_1.expect.fail();
        }
        catch (err) {
            chai_1.expect(err.message).to.equal(`Unknown log level type [dummyType]`);
        }
    });
});
//# sourceMappingURL=util.test.js.map