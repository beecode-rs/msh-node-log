"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_level_type_1 = require("../log-level-type");
const simple_console_log_1 = require("./simple-console-log");
const sinon_1 = require("sinon");
describe('logger - SimpleConsoleLog', () => {
    const sandbox = sinon_1.createSandbox();
    let stub_console_log;
    const simpleConsoleLog = new simple_console_log_1.SimpleConsoleLog();
    const mockDateTime = new Date();
    const mockDateTimeStr = mockDateTime.toISOString();
    beforeEach(() => {
        stub_console_log = sandbox.stub(console, 'log');
    });
    afterEach(sandbox.restore);
    describe('log', () => {
        it('should call console.log with string', () => {
            const msg = 'test';
            simpleConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, messageObject: msg, datetime: mockDateTime });
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, `${mockDateTimeStr} - DEBUG: ${msg}`);
        });
        it('should call console.log with object', () => {
            const obj = { test: 'test' };
            simpleConsoleLog.log({ type: log_level_type_1.LogLevelType.INFO, messageObject: obj, datetime: mockDateTime });
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, `${mockDateTimeStr} - INFO:`, obj);
        });
        it('should call console.log with two arguments', () => {
            const msg = 'test';
            const obj = { test: 'test' };
            simpleConsoleLog.log({ type: log_level_type_1.LogLevelType.ERROR, messageObject: msg, meta: obj, datetime: mockDateTime });
            sinon_1.assert.calledTwice(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log.getCall(0), `${mockDateTimeStr} - ERROR: ${msg}`);
            sinon_1.assert.calledWith(stub_console_log.getCall(1), obj);
        });
    });
});
//# sourceMappingURL=simple-console-log.test.js.map