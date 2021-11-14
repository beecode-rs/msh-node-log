import { mockConsoleLogStrategyFactory } from './console-log-strategy/console-log-strategy.test'
import { ConsoleLogger } from './console-logger'
import { LogLevelType } from './log-level-type'
import { expect } from 'chai'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('ConsoleLogger', () => {
  const defaultLogger = new ConsoleLogger()

  describe('constructor', () => {
    it('should set default log level', () => {
      expect(defaultLogger['_logLevel']).to.equal(LogLevelType.ERROR)
    })
    it('should set log level passed through constructor', () => {
      const infoLogger = new ConsoleLogger({ logLevel: LogLevelType.INFO })
      expect(infoLogger['_logLevel']).to.equal(LogLevelType.INFO)
    })
  })

  describe('LogLevelToInt', () => {
    it('should return 0 for error', () => {
      expect(ConsoleLogger.LogLevelToInt(LogLevelType.ERROR)).to.equal(0)
    })
    it('should return 1 for warn', () => {
      expect(ConsoleLogger.LogLevelToInt(LogLevelType.WARN)).to.equal(1)
    })
    it('should return 2 for info', () => {
      expect(ConsoleLogger.LogLevelToInt(LogLevelType.INFO)).to.equal(2)
    })
    it('should return 3 for debug', () => {
      expect(ConsoleLogger.LogLevelToInt(LogLevelType.DEBUG)).to.equal(3)
    })
    it('should throw error if unknown level passed', () => {
      const notALogLevel = 'not a log level'
      try {
        expect(ConsoleLogger.LogLevelToInt(notALogLevel as any)).to.equal(1)
      } catch (err) {
        if (!(err instanceof Error)) throw err
        expect(err.message).to.equal(`ExhaustiveCheck: Unknown log lever [${notALogLevel}]`)
      }
    })
  })

  describe('_shouldLog', () => {
    const { ERROR, WARN, INFO, DEBUG } = LogLevelType
    ;(
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
      ] as [LogLevelType, LogLevelType, boolean][]
    ).forEach(([confLevel, msgLevel, shouldLog]) => {
      it(`should return ${shouldLog} if config level ${confLevel} for message level ${msgLevel}`, () => {
        const logger = new ConsoleLogger({ logLevel: confLevel })
        expect(logger['_shouldLog'](msgLevel)).to.equal(shouldLog)
      })
    })
  })

  describe('_logMessage', () => {
    const sandbox = createSandbox()
    let stub_logger_shouldLog: SinonStub
    const consoleLogStrategy = new (mockConsoleLogStrategyFactory(sandbox))()
    const logMessageLogger = new ConsoleLogger({ consoleLogStrategy })
    beforeEach(() => {
      stub_logger_shouldLog = sandbox.stub(logMessageLogger as any, '_shouldLog')
    })
    afterEach(sandbox.restore)

    it('should not log messages if shouldLog returns false', () => {
      stub_logger_shouldLog.returns(false)
      logMessageLogger['_logMessage'](LogLevelType.ERROR, 'test message')
      assert.calledOnce(stub_logger_shouldLog)
      assert.calledWith(stub_logger_shouldLog, LogLevelType.ERROR)
      assert.notCalled(consoleLogStrategy.log)
    })

    it('should log only string message if no object passed', () => {
      stub_logger_shouldLog.returns(true)
      logMessageLogger['_logMessage'](LogLevelType.ERROR, 'test message')
      assert.calledOnce(stub_logger_shouldLog)
      assert.calledWith(stub_logger_shouldLog, LogLevelType.ERROR)
      assert.calledOnce(consoleLogStrategy.log)
      assert.calledWith(consoleLogStrategy.log, { type: 'error', messageObject: 'test message', meta: undefined })
    })
  })

  describe('public functions', () => {
    const sandbox = createSandbox()
    let stub_logger_logMessage: SinonStub
    const logger = new ConsoleLogger()
    const dummyMessage = 'dummy message'
    const dummyObject = { dummy: 'object' }
    beforeEach(() => {
      stub_logger_logMessage = sandbox.stub(logger, '_logMessage' as any)
    })
    afterEach(sandbox.restore)

    it('should call logger with error level for error', () => {
      logger.error(dummyMessage, dummyObject)
      assert.calledOnce(stub_logger_logMessage)
      assert.calledWith(stub_logger_logMessage, LogLevelType.ERROR, dummyMessage, dummyObject)
    })

    it('should call logger with warn level for warn', () => {
      logger.warn(dummyMessage, dummyObject)
      assert.calledOnce(stub_logger_logMessage)
      assert.calledWith(stub_logger_logMessage, LogLevelType.WARN, dummyMessage, dummyObject)
    })

    it('should call logger with info level for info', () => {
      logger.info(dummyMessage, dummyObject)
      assert.calledOnce(stub_logger_logMessage)
      assert.calledWith(stub_logger_logMessage, LogLevelType.INFO, dummyMessage, dummyObject)
    })

    it('should call logger with debug level for debug', () => {
      logger.debug(dummyMessage, dummyObject)
      assert.calledOnce(stub_logger_logMessage)
      assert.calledWith(stub_logger_logMessage, LogLevelType.DEBUG, dummyMessage, dummyObject)
    })
  })
})
