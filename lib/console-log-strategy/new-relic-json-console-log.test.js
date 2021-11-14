"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_level_type_1 = require("../log-level-type");
const new_relic_json_console_log_1 = require("./new-relic-json-console-log");
const sinon_1 = require("sinon");
describe('NewRelicConsoleLog', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let stub_console_log;
    const newRelicJsonConsoleLog = new new_relic_json_console_log_1.NewRelicJsonConsoleLog();
    const mockDateTime = new Date();
    const mockTimeStamp = mockDateTime.getTime();
    beforeEach(() => {
        stub_console_log = sandbox.stub(console, 'log');
    });
    afterEach(sandbox.restore);
    describe('log', () => {
        it('should call console.log with string', () => {
            const msg = 'test';
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.ERROR, messageObject: msg, datetime: mockDateTime });
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify({ logtype: 'error', timestamp: mockTimeStamp, message: msg }));
        });
        it('should call console.log with object', () => {
            const obj = { test: 'test' };
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.INFO, messageObject: obj, datetime: mockDateTime });
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify(Object.assign(Object.assign({}, obj), { logtype: 'info', timestamp: mockTimeStamp })));
        });
        it('should call console.log with two arguments (meta:object)', () => {
            const msg = 'test';
            const metaObj = { test: 'test' };
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, messageObject: msg, meta: metaObj, datetime: mockDateTime });
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify(Object.assign(Object.assign({}, metaObj), { logtype: 'debug', timestamp: mockTimeStamp, message: msg })));
        });
        it('should call console.log with two arguments (meta:string)', () => {
            const msg = 'test';
            const metaString = 'meta test';
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, messageObject: msg, meta: metaString, datetime: mockDateTime });
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify({ meta: metaString, logtype: 'debug', timestamp: mockTimeStamp, message: msg }));
        });
    });
});
//# sourceMappingURL=new-relic-json-console-log.test.js.map