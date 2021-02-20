import { ConsoleLogger, LogLevel } from '.'
import { expect } from 'chai'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('logger - ConsoleLogger', () => {
  const defaultLogger = new ConsoleLogger()

  describe('constructor', () => {
    it('should set default log level', () => {
      expect(defaultLogger['_logLevel']).to.equal(LogLevel.ERROR)
    })
    it('should set log level passed through constructor', () => {
      const infoLogger = new ConsoleLogger(LogLevel.INFO)
      expect(infoLogger['_logLevel']).to.equal(LogLevel.INFO)
    })
  })

  describe('_logLevelToInt', () => {
    it('should return 0 for error', () => {
      expect(defaultLogger['_logLevelToInt'](LogLevel.ERROR)).to.equal(0)
    })
    it('should return 1 for warn', () => {
      expect(defaultLogger['_logLevelToInt'](LogLevel.WARN)).to.equal(1)
    })
    it('should return 2 for info', () => {
      expect(defaultLogger['_logLevelToInt'](LogLevel.INFO)).to.equal(2)
    })
    it('should return 3 for debug', () => {
      expect(defaultLogger['_logLevelToInt'](LogLevel.DEBUG)).to.equal(3)
    })
    it('should throw error if unknown level passed', () => {
      const notALogLevel = 'not a log level'
      try {
        expect(defaultLogger['_logLevelToInt'](notALogLevel as any)).to.equal(1)
      } catch (err) {
        expect(err.message).to.equal(`Unknown log lever [${notALogLevel}]`)
      }
    })
  })

  describe('_shouldLog', () => {
    const { ERROR, WARN, INFO, DEBUG } = LogLevel
    ;([
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
    ] as [LogLevel, LogLevel, boolean][]).forEach(([confLevel, msgLevel, shouldLog]) => {
      it(`should return ${shouldLog} if config level ${confLevel} for message level ${msgLevel}`, () => {
        const logger = new ConsoleLogger(confLevel)
        expect(logger['_shouldLog'](msgLevel)).to.equal(shouldLog)
      })
    })
  })

  describe('_consoleLog', () => {
    const sandbox = createSandbox()
    let stub_console_log: SinonStub
    const loggerInstance = new ConsoleLogger()

    beforeEach(() => {
      stub_console_log = sandbox.stub(console, 'log')
    })
    afterEach(sandbox.restore)

    it('should call console.log with string', () => {
      const msg = 'test'
      loggerInstance['_consoleLog'](msg)
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, msg)
    })
    it('should call console.log with object', () => {
      const obj = { test: 'test' }
      loggerInstance['_consoleLog'](obj)
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, obj)
    })

    it('should call console.log with two arguments', () => {
      const msg = 'test'
      const obj = { test: 'test' }
      loggerInstance['_consoleLog'](msg, obj)
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, msg, obj)
    })
  })

  describe('_logMessage', () => {
    const sandbox = createSandbox()
    let stub_console_log: SinonStub
    let stub_logger_shouldLog: SinonStub
    const logMessageLogger = new ConsoleLogger()
    beforeEach(() => {
      stub_console_log = sandbox.stub(logMessageLogger as any, '_consoleLog')
      stub_logger_shouldLog = sandbox.stub(logMessageLogger as any, '_shouldLog')
    })
    afterEach(sandbox.restore)

    it('should not log messages if shouldLog returns false', () => {
      stub_logger_shouldLog.returns(false)
      logMessageLogger['_logMessage'](LogLevel.ERROR, 'test message')
      assert.calledOnce(stub_logger_shouldLog)
      assert.calledWith(stub_logger_shouldLog, LogLevel.ERROR)
      assert.notCalled(stub_console_log)
    })

    it('should log only string message if no object passed', () => {
      stub_logger_shouldLog.returns(true)
      logMessageLogger['_logMessage'](LogLevel.ERROR, 'test message')
      assert.calledOnce(stub_logger_shouldLog)
      assert.calledWith(stub_logger_shouldLog, LogLevel.ERROR)
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, 'ERROR: test message')
    })

    it('should log only object message if no object passed', () => {
      stub_logger_shouldLog.returns(true)
      const objMsg = { test: 'test' }
      logMessageLogger['_logMessage'](LogLevel.ERROR, objMsg)
      assert.calledOnce(stub_logger_shouldLog)
      assert.calledWith(stub_logger_shouldLog, LogLevel.ERROR)
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, 'ERROR:', objMsg)
    })

    it('should call logger twice for message and object', () => {
      stub_logger_shouldLog.returns(true)
      const someObject = { test: 'object' }
      logMessageLogger['_logMessage'](LogLevel.ERROR, 'test message', someObject)
      assert.calledOnce(stub_logger_shouldLog)
      assert.calledWith(stub_logger_shouldLog, LogLevel.ERROR)
      assert.calledTwice(stub_console_log)
      assert.calledWith(stub_console_log.firstCall, 'ERROR: test message')
      assert.calledWith(stub_console_log.secondCall, someObject)
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
      assert.calledWith(stub_logger_logMessage, LogLevel.ERROR, dummyMessage, dummyObject)
    })

    it('should call logger with warn level for warn', () => {
      logger.warn(dummyMessage, dummyObject)
      assert.calledOnce(stub_logger_logMessage)
      assert.calledWith(stub_logger_logMessage, LogLevel.WARN, dummyMessage, dummyObject)
    })

    it('should call logger with info level for info', () => {
      logger.info(dummyMessage, dummyObject)
      assert.calledOnce(stub_logger_logMessage)
      assert.calledWith(stub_logger_logMessage, LogLevel.INFO, dummyMessage, dummyObject)
    })

    it('should call logger with debug level for debug', () => {
      logger.debug(dummyMessage, dummyObject)
      assert.calledOnce(stub_logger_logMessage)
      assert.calledWith(stub_logger_logMessage, LogLevel.DEBUG, dummyMessage, dummyObject)
    })
  })
})
