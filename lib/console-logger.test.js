"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
describe('logger - ConsoleLogger', () => {
    const defaultLogger = new _1.ConsoleLogger();
    describe.only('constructor', () => {
        it('should set default log level', () => {
            chai_1.expect(defaultLogger['_logLevel']).to.equal(_1.LogLevelType.ERROR);
        });
        it('should set log level passed through constructor', () => {
            const infoLogger = new _1.ConsoleLogger(_1.LogLevelType.INFO);
            chai_1.expect(infoLogger['_logLevel']).to.equal(_1.LogLevelType.INFO);
        });
        it('should allow string values', () => {
            const infoLogger = new _1.ConsoleLogger('info');
            chai_1.expect(infoLogger['_logLevel']).to.equal(_1.LogLevelType.INFO);
        });
        it('should throw error if unknown log level passed', () => {
            try {
                new _1.ConsoleLogger('foo');
                chai_1.expect.fail();
            }
            catch (e) {
                chai_1.expect(e.message).to.eq("Unknown log level [foo]. Allowed values ['error' | 'warn' | 'info' | 'debug']");
            }
        });
    });
    describe('_logLevelToInt', () => {
        it('should return 0 for error', () => {
            chai_1.expect(defaultLogger['_logLevelToInt'](_1.LogLevelType.ERROR)).to.equal(0);
        });
        it('should return 1 for warn', () => {
            chai_1.expect(defaultLogger['_logLevelToInt'](_1.LogLevelType.WARN)).to.equal(1);
        });
        it('should return 2 for info', () => {
            chai_1.expect(defaultLogger['_logLevelToInt'](_1.LogLevelType.INFO)).to.equal(2);
        });
        it('should return 3 for debug', () => {
            chai_1.expect(defaultLogger['_logLevelToInt'](_1.LogLevelType.DEBUG)).to.equal(3);
        });
        it('should throw error if unknown level passed', () => {
            const notALogLevel = 'not a log level';
            try {
                chai_1.expect(defaultLogger['_logLevelToInt'](notALogLevel)).to.equal(1);
            }
            catch (err) {
                chai_1.expect(err.message).to.equal(`Unknown log lever [${notALogLevel}]`);
            }
        });
    });
    describe('_shouldLog', () => {
        const { ERROR, WARN, INFO, DEBUG } = _1.LogLevelType;
        [
            [ERROR, ERROR, true],
            [ERROR, WARN, false],
            [ERROR, INFO, false],
            [ERROR, DEBUG, false],
            [WARN, ERROR, true],
            [WARN, WARN, true],
            [WARN, INFO, false],
            [WARN, DEBUG, false],
            [INFO, ERROR, true],
            [INFO, WARN, true],
            [INFO, INFO, true],
            [INFO, DEBUG, false],
            [DEBUG, ERROR, true],
            [DEBUG, WARN, true],
            [DEBUG, INFO, true],
            [DEBUG, DEBUG, true],
        ].forEach(([confLevel, msgLevel, shouldLog]) => {
            it(`should return ${shouldLog} if config level ${confLevel} for message level ${msgLevel}`, () => {
                const logger = new _1.ConsoleLogger(confLevel);
                chai_1.expect(logger['_shouldLog'](msgLevel)).to.equal(shouldLog);
            });
        });
    });
    describe('_consoleLog', () => {
        const sandbox = sinon_1.createSandbox();
        let stub_console_log;
        const loggerInstance = new _1.ConsoleLogger();
        beforeEach(() => {
            stub_console_log = sandbox.stub(console, 'log');
        });
        afterEach(sandbox.restore);
        it('should call console.log with string', () => {
            const msg = 'test';
            loggerInstance['_consoleLog'](msg);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, msg);
        });
        it('should call console.log with object', () => {
            const obj = { test: 'test' };
            loggerInstance['_consoleLog'](obj);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, obj);
        });
        it('should call console.log with two arguments', () => {
            const msg = 'test';
            const obj = { test: 'test' };
            loggerInstance['_consoleLog'](msg, obj);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, msg, obj);
        });
    });
    describe('_logMessage', () => {
        const sandbox = sinon_1.createSandbox();
        let stub_console_log;
        let stub_logger_shouldLog;
        const logMessageLogger = new _1.ConsoleLogger();
        beforeEach(() => {
            stub_console_log = sandbox.stub(logMessageLogger, '_consoleLog');
            stub_logger_shouldLog = sandbox.stub(logMessageLogger, '_shouldLog');
        });
        afterEach(sandbox.restore);
        it('should not log messages if shouldLog returns false', () => {
            stub_logger_shouldLog.returns(false);
            logMessageLogger['_logMessage'](_1.LogLevelType.ERROR, 'test message');
            sinon_1.assert.calledOnce(stub_logger_shouldLog);
            sinon_1.assert.calledWith(stub_logger_shouldLog, _1.LogLevelType.ERROR);
            sinon_1.assert.notCalled(stub_console_log);
        });
        it('should log only string message if no object passed', () => {
            stub_logger_shouldLog.returns(true);
            logMessageLogger['_logMessage'](_1.LogLevelType.ERROR, 'test message');
            sinon_1.assert.calledOnce(stub_logger_shouldLog);
            sinon_1.assert.calledWith(stub_logger_shouldLog, _1.LogLevelType.ERROR);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, 'ERROR: test message');
        });
        it('should log only object message if no object passed', () => {
            stub_logger_shouldLog.returns(true);
            const objMsg = { test: 'test' };
            logMessageLogger['_logMessage'](_1.LogLevelType.ERROR, objMsg);
            sinon_1.assert.calledOnce(stub_logger_shouldLog);
            sinon_1.assert.calledWith(stub_logger_shouldLog, _1.LogLevelType.ERROR);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, 'ERROR:', objMsg);
        });
        it('should call logger twice for message and object', () => {
            stub_logger_shouldLog.returns(true);
            const someObject = { test: 'object' };
            logMessageLogger['_logMessage'](_1.LogLevelType.ERROR, 'test message', someObject);
            sinon_1.assert.calledOnce(stub_logger_shouldLog);
            sinon_1.assert.calledWith(stub_logger_shouldLog, _1.LogLevelType.ERROR);
            sinon_1.assert.calledTwice(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log.firstCall, 'ERROR: test message');
            sinon_1.assert.calledWith(stub_console_log.secondCall, someObject);
        });
    });
    describe('public functions', () => {
        const sandbox = sinon_1.createSandbox();
        let stub_logger_logMessage;
        const logger = new _1.ConsoleLogger();
        const dummyMessage = 'dummy message';
        const dummyObject = { dummy: 'object' };
        beforeEach(() => {
            stub_logger_logMessage = sandbox.stub(logger, '_logMessage');
        });
        afterEach(sandbox.restore);
        it('should call logger with error level for error', () => {
            logger.error(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, _1.LogLevelType.ERROR, dummyMessage, dummyObject);
        });
        it('should call logger with warn level for warn', () => {
            logger.warn(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, _1.LogLevelType.WARN, dummyMessage, dummyObject);
        });
        it('should call logger with info level for info', () => {
            logger.info(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, _1.LogLevelType.INFO, dummyMessage, dummyObject);
        });
        it('should call logger with debug level for debug', () => {
            logger.debug(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, _1.LogLevelType.DEBUG, dummyMessage, dummyObject);
        });
    });
});
//# sourceMappingURL=console-logger.test.js.map