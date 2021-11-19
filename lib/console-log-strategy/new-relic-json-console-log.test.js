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
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.ERROR, datetime: mockDateTime }, msg);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify({ logtype: 'error', timestamp: mockTimeStamp, message: msg }));
        });
        it('should call console.log with object', () => {
            const obj = { test: 'test' };
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.INFO, datetime: mockDateTime }, obj);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify(Object.assign({ logtype: 'info', timestamp: mockTimeStamp }, obj)));
        });
        it('should call console.log with message and meta', () => {
            const msg = 'test';
            const metaObj = { test: 'test' };
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime }, msg);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify(Object.assign(Object.assign({}, metaObj), { logtype: 'debug', timestamp: mockTimeStamp, message: msg })));
        });
        it('should call console.log with string message and prefix', () => {
            const msg = 'test';
            const prefix = 'Prefix';
            const metaObj = { test: 'test' };
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime, prefix }, msg);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify(Object.assign(Object.assign({}, metaObj), { logtype: 'debug', timestamp: mockTimeStamp, message: `${prefix} ${msg}` })));
        });
        it('should call console.log with object message and prefix {someMessage:string}', () => {
            const msg = { someMessage: 'test' };
            const prefix = 'Prefix';
            const metaObj = { test: 'test' };
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime, prefix }, msg);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify(Object.assign(Object.assign(Object.assign(Object.assign({}, metaObj), { logtype: 'debug', timestamp: mockTimeStamp }), msg), { message: prefix })));
        });
        it('should call console.log with object message and prefix {message:string}', () => {
            const msg = { message: 'test' };
            const prefix = 'Prefix';
            const metaObj = { test: 'test' };
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime, prefix }, msg);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify(Object.assign(Object.assign(Object.assign(Object.assign({}, metaObj), { logtype: 'debug', timestamp: mockTimeStamp }), msg), { message: `${prefix} ${msg.message}` })));
        });
        it('should call console.log with string message and prefix', () => {
            const msg = 'test';
            const prefix = 'Prefix';
            const metaObj = { test: 'test' };
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime, prefix }, msg);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, JSON.stringify(Object.assign(Object.assign({}, metaObj), { logtype: 'debug', timestamp: mockTimeStamp, message: `${prefix} ${msg}` })));
        });
        it('should call console.log with multi string message and meta', () => {
            const msg = 'test';
            const msg1 = 'test1';
            const msg2 = 'test2';
            const metaObj = { test: 'test' };
            newRelicJsonConsoleLog.log({ type: log_level_type_1.LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime }, msg, msg1, msg2);
            sinon_1.assert.calledThrice(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log.getCall(0), JSON.stringify(Object.assign(Object.assign({}, metaObj), { logtype: 'debug', timestamp: mockTimeStamp, message: msg })));
            sinon_1.assert.calledWith(stub_console_log.getCall(1), JSON.stringify(Object.assign(Object.assign({}, metaObj), { logtype: 'debug', timestamp: mockTimeStamp, message: msg1 })));
            sinon_1.assert.calledWith(stub_console_log.getCall(2), JSON.stringify(Object.assign(Object.assign({}, metaObj), { logtype: 'debug', timestamp: mockTimeStamp, message: msg2 })));
        });
    });
});
//# sourceMappingURL=new-relic-json-console-log.test.js.map