"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_level_type_1 = require("../log-level-type");
const simple_console_log_1 = require("./simple-console-log");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
describe('SimpleConsoleLog', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let stub_console_log;
    let stub_console_info;
    let stub_console_warn;
    let stub_console_error;
    const simpleConsoleLog = new simple_console_log_1.SimpleConsoleLog();
    const mockDateTime = new Date();
    const mockDateTimeStr = mockDateTime.toISOString();
    beforeEach(() => {
        stub_console_log = sandbox.stub(console, 'log');
        stub_console_info = sandbox.stub(console, 'info');
        stub_console_warn = sandbox.stub(console, 'warn');
        stub_console_error = sandbox.stub(console, 'error');
    });
    afterEach(sandbox.restore);
    describe('log', () => {
        it('should call console.log with string', () => {
            const msg = 'test';
            simpleConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, messageObject: msg, datetime: mockDateTime });
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, `${mockDateTimeStr} - DEBUG: ${msg}`);
        });
        it('should call console.warn with string', () => {
            const msg = 'test';
            simpleConsoleLog.log({ type: log_level_type_1.LogLevelType.WARN, messageObject: msg, datetime: mockDateTime });
            sinon_1.assert.calledOnce(stub_console_warn);
            sinon_1.assert.calledWith(stub_console_warn, `${mockDateTimeStr} - WARN: ${msg}`);
        });
        it('should call console.log with object', () => {
            const obj = { test: 'test' };
            simpleConsoleLog.log({ type: log_level_type_1.LogLevelType.INFO, messageObject: obj, datetime: mockDateTime });
            sinon_1.assert.calledOnce(stub_console_info);
            sinon_1.assert.calledWith(stub_console_info, `${mockDateTimeStr} - INFO:`, obj);
        });
        it('should call console.log with two arguments (meta:object)', () => {
            const msg = 'test';
            const metaObj = { test: 'test' };
            simpleConsoleLog.log({ type: log_level_type_1.LogLevelType.ERROR, messageObject: msg, meta: metaObj, datetime: mockDateTime });
            sinon_1.assert.calledTwice(stub_console_error);
            sinon_1.assert.calledWith(stub_console_error.getCall(0), `${mockDateTimeStr} - ERROR: ${msg}`);
            sinon_1.assert.calledWith(stub_console_error.getCall(1), metaObj);
        });
        it('should call console.log with two arguments (meta:string)', () => {
            const msg = 'test';
            const metaString = 'meta test';
            simpleConsoleLog.log({ type: log_level_type_1.LogLevelType.ERROR, messageObject: msg, meta: metaString, datetime: mockDateTime });
            sinon_1.assert.calledTwice(stub_console_error);
            sinon_1.assert.calledWith(stub_console_error.getCall(0), `${mockDateTimeStr} - ERROR: ${msg}`);
            sinon_1.assert.calledWith(stub_console_error.getCall(1), metaString);
        });
    });
    describe('LogTypeToFunction', () => {
        ;
        [
            [log_level_type_1.LogLevelType.DEBUG, 'log'],
            [log_level_type_1.LogLevelType.INFO, 'info'],
            [log_level_type_1.LogLevelType.WARN, 'warn'],
            [log_level_type_1.LogLevelType.ERROR, 'error'],
        ].forEach(([type, result]) => {
            it(`should return ${result} for log level type ${type}`, () => {
                (0, chai_1.expect)(simple_console_log_1.SimpleConsoleLog.LogTypeToFunction(type)).to.eq(result);
            });
        });
        it('should throw error if wrong type passed', () => {
            try {
                simple_console_log_1.SimpleConsoleLog.LogTypeToFunction('dummyType');
                chai_1.expect.fail();
            }
            catch (err) {
                if (!(err instanceof Error))
                    throw err;
                (0, chai_1.expect)(err.message).to.equal(`ExhaustiveCheck: Unknown log level type [dummyType]`);
            }
        });
    });
});
//# sourceMappingURL=simple-console-log.test.js.map