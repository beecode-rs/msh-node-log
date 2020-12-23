"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
describe('logger - ConsoleLogger', () => {
    const defaultLogger = new _1.ConsoleLogger();
    describe('constructor', () => {
        it('should set default log level', () => {
            chai_1.expect(defaultLogger['__logLevel']).to.equal(_1.LogLevel.ERROR);
        });
        it('should set log level passed through constructor', () => {
            const infoLogger = new _1.ConsoleLogger(_1.LogLevel.INFO);
            chai_1.expect(infoLogger['__logLevel']).to.equal(_1.LogLevel.INFO);
        });
    });
    describe('__logLevelToInt', () => {
        it('should return 0 for error', () => {
            chai_1.expect(defaultLogger['__logLevelToInt'](_1.LogLevel.ERROR)).to.equal(0);
        });
        it('should return 1 for warn', () => {
            chai_1.expect(defaultLogger['__logLevelToInt'](_1.LogLevel.WARN)).to.equal(1);
        });
        it('should return 2 for info', () => {
            chai_1.expect(defaultLogger['__logLevelToInt'](_1.LogLevel.INFO)).to.equal(2);
        });
        it('should return 3 for debug', () => {
            chai_1.expect(defaultLogger['__logLevelToInt'](_1.LogLevel.DEBUG)).to.equal(3);
        });
        it('should throw error if unknown level passed', () => {
            const notALogLevel = 'not a log level';
            try {
                chai_1.expect(defaultLogger['__logLevelToInt'](notALogLevel)).to.equal(1);
            }
            catch (err) {
                chai_1.expect(err.message).to.equal(`Unknown log lever [${notALogLevel}]`);
            }
        });
    });
    describe('__shouldLog', () => {
        const { ERROR, WARN, INFO, DEBUG } = _1.LogLevel;
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
                chai_1.expect(logger['__shouldLog'](msgLevel)).to.equal(shouldLog);
            });
        });
    });
    describe('__logMessage', () => {
        const sandbox = sinon_1.createSandbox();
        let stub_console_log;
        let stub_logger_shouldLog;
        const logMessageLogger = new _1.ConsoleLogger();
        beforeEach(() => {
            stub_console_log = sandbox.stub(console, 'log');
            stub_logger_shouldLog = sandbox.stub(logMessageLogger, '__shouldLog');
        });
        afterEach(sandbox.restore);
        it('should not log messages if shouldLog returns false', () => {
            stub_logger_shouldLog.returns(false);
            logMessageLogger['__logMessage'](_1.LogLevel.ERROR, 'test message');
            sinon_1.assert.calledOnce(stub_logger_shouldLog);
            sinon_1.assert.calledWith(stub_logger_shouldLog, _1.LogLevel.ERROR);
            sinon_1.assert.notCalled(stub_console_log);
        });
        it('should log only message if no object passed', () => {
            stub_logger_shouldLog.returns(true);
            logMessageLogger['__logMessage'](_1.LogLevel.ERROR, 'test message');
            sinon_1.assert.calledOnce(stub_logger_shouldLog);
            sinon_1.assert.calledWith(stub_logger_shouldLog, _1.LogLevel.ERROR);
            sinon_1.assert.calledOnce(stub_console_log);
            sinon_1.assert.calledWith(stub_console_log, 'ERROR: test message');
        });
        it('should call logger twice for message and object', () => {
            stub_logger_shouldLog.returns(true);
            const someObject = { test: 'object' };
            logMessageLogger['__logMessage'](_1.LogLevel.ERROR, 'test message', someObject);
            sinon_1.assert.calledOnce(stub_logger_shouldLog);
            sinon_1.assert.calledWith(stub_logger_shouldLog, _1.LogLevel.ERROR);
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
            stub_logger_logMessage = sandbox.stub(logger, '__logMessage');
        });
        afterEach(sandbox.restore);
        it('should call logger with error level for error', () => {
            logger.error(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, _1.LogLevel.ERROR, dummyMessage, dummyObject);
        });
        it('should call logger with warn level for warn', () => {
            logger.warn(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, _1.LogLevel.WARN, dummyMessage, dummyObject);
        });
        it('should call logger with info level for info', () => {
            logger.info(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, _1.LogLevel.INFO, dummyMessage, dummyObject);
        });
        it('should call logger with debug level for debug', () => {
            logger.debug(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, _1.LogLevel.DEBUG, dummyMessage, dummyObject);
        });
    });
});
//# sourceMappingURL=console-logger.test.js.map