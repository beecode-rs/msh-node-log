"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_log_strategy_test_1 = require("./console-log-strategy/console-log-strategy.test");
const console_logger_1 = require("./console-logger");
const log_level_type_1 = require("./log-level-type");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
describe('ConsoleLogger', () => {
    const defaultLogger = new console_logger_1.ConsoleLogger();
    describe('constructor', () => {
        it('should set default log level', () => {
            (0, chai_1.expect)(defaultLogger['_logLevel']).to.equal(log_level_type_1.LogLevelType.ERROR);
        });
        it('should set log level passed through constructor', () => {
            const infoLogger = new console_logger_1.ConsoleLogger({ logLevel: log_level_type_1.LogLevelType.INFO });
            (0, chai_1.expect)(infoLogger['_logLevel']).to.equal(log_level_type_1.LogLevelType.INFO);
        });
    });
    describe('LogLevelToInt', () => {
        it('should return 0 for error', () => {
            (0, chai_1.expect)(console_logger_1.ConsoleLogger.LogLevelToInt(log_level_type_1.LogLevelType.ERROR)).to.equal(0);
        });
        it('should return 1 for warn', () => {
            (0, chai_1.expect)(console_logger_1.ConsoleLogger.LogLevelToInt(log_level_type_1.LogLevelType.WARN)).to.equal(1);
        });
        it('should return 2 for info', () => {
            (0, chai_1.expect)(console_logger_1.ConsoleLogger.LogLevelToInt(log_level_type_1.LogLevelType.INFO)).to.equal(2);
        });
        it('should return 3 for debug', () => {
            (0, chai_1.expect)(console_logger_1.ConsoleLogger.LogLevelToInt(log_level_type_1.LogLevelType.DEBUG)).to.equal(3);
        });
        it('should throw error if unknown level passed', () => {
            const notALogLevel = 'not a log level';
            try {
                (0, chai_1.expect)(console_logger_1.ConsoleLogger.LogLevelToInt(notALogLevel)).to.equal(1);
            }
            catch (err) {
                if (!(err instanceof Error))
                    throw err;
                (0, chai_1.expect)(err.message).to.equal(`ExhaustiveCheck: Unknown log lever [${notALogLevel}]`);
            }
        });
    });
    describe('_shouldLog', () => {
        const { ERROR, WARN, INFO, DEBUG } = log_level_type_1.LogLevelType;
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
                const logger = new console_logger_1.ConsoleLogger({ logLevel: confLevel });
                (0, chai_1.expect)(logger['_shouldLog'](msgLevel)).to.equal(shouldLog);
            });
        });
    });
    describe('_logMessage', () => {
        const sandbox = (0, sinon_1.createSandbox)();
        let stub_logger_shouldLog;
        const consoleLogStrategy = new ((0, console_log_strategy_test_1.mockConsoleLogStrategyFactory)(sandbox))();
        const logMessageLogger = new console_logger_1.ConsoleLogger({ consoleLogStrategy });
        beforeEach(() => {
            stub_logger_shouldLog = sandbox.stub(logMessageLogger, '_shouldLog');
        });
        afterEach(sandbox.restore);
        it('should not log messages if shouldLog returns false', () => {
            stub_logger_shouldLog.returns(false);
            logMessageLogger['_logMessage'](log_level_type_1.LogLevelType.ERROR, 'test message');
            sinon_1.assert.calledOnce(stub_logger_shouldLog);
            sinon_1.assert.calledWith(stub_logger_shouldLog, log_level_type_1.LogLevelType.ERROR);
            sinon_1.assert.notCalled(consoleLogStrategy.log);
        });
        it('should log only string message if no object passed', () => {
            stub_logger_shouldLog.returns(true);
            logMessageLogger['_logMessage'](log_level_type_1.LogLevelType.ERROR, 'test message');
            sinon_1.assert.calledOnce(stub_logger_shouldLog);
            sinon_1.assert.calledWith(stub_logger_shouldLog, log_level_type_1.LogLevelType.ERROR);
            sinon_1.assert.calledOnce(consoleLogStrategy.log);
            sinon_1.assert.calledWith(consoleLogStrategy.log, { type: 'error', messageObject: 'test message', meta: undefined });
        });
    });
    describe('public functions', () => {
        const sandbox = (0, sinon_1.createSandbox)();
        let stub_logger_logMessage;
        const logger = new console_logger_1.ConsoleLogger();
        const dummyMessage = 'dummy message';
        const dummyObject = { dummy: 'object' };
        beforeEach(() => {
            stub_logger_logMessage = sandbox.stub(logger, '_logMessage');
        });
        afterEach(sandbox.restore);
        it('should call logger with error level for error', () => {
            logger.error(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, log_level_type_1.LogLevelType.ERROR, dummyMessage, dummyObject);
        });
        it('should call logger with warn level for warn', () => {
            logger.warn(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, log_level_type_1.LogLevelType.WARN, dummyMessage, dummyObject);
        });
        it('should call logger with info level for info', () => {
            logger.info(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, log_level_type_1.LogLevelType.INFO, dummyMessage, dummyObject);
        });
        it('should call logger with debug level for debug', () => {
            logger.debug(dummyMessage, dummyObject);
            sinon_1.assert.calledOnce(stub_logger_logMessage);
            sinon_1.assert.calledWith(stub_logger_logMessage, log_level_type_1.LogLevelType.DEBUG, dummyMessage, dummyObject);
        });
    });
});
//# sourceMappingURL=console-logger.test.js.map