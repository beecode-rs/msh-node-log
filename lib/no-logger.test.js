"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const sinon_1 = require("sinon");
describe('logger - NoLogger', () => {
    describe('should not call logger', () => {
        const sandbox = sinon_1.createSandbox();
        const logger = new _1.NoLogger();
        const dummyMessage = 'dummyMessage';
        const dummyObject = { dummy: 'object' };
        let stub_console_log;
        beforeEach(() => {
            stub_console_log = sandbox.stub(console, 'log');
        });
        afterEach(sandbox.restore);
        it('should not log on error', () => {
            logger.error(dummyMessage, dummyObject);
            sinon_1.assert.notCalled(stub_console_log);
        });
        it('should not log on warn', () => {
            logger.warn(dummyMessage, dummyObject);
            sinon_1.assert.notCalled(stub_console_log);
        });
        it('should not log on info', () => {
            logger.info(dummyMessage, dummyObject);
            sinon_1.assert.notCalled(stub_console_log);
        });
        it('should not log on debug', () => {
            logger.debug(dummyMessage, dummyObject);
            sinon_1.assert.notCalled(stub_console_log);
        });
    });
});
//# sourceMappingURL=no-logger.test.js.map