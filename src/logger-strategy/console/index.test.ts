import { LogLevel } from 'src/log-level'
import { LoggerStrategyConsole } from 'src/logger-strategy/console'
import { ConsoleLogStrategyMock } from 'src/logger-strategy/console/log-strategy/__mocks__/console-log-strategy-mock'
import { ConsoleLogStrategySimple } from 'src/logger-strategy/console/log-strategy/simple'

describe('LoggerStrategyConsole', () => {
	const defaultLogger = new LoggerStrategyConsole()

	describe('constructor', () => {
		it('should set default log level', () => {
			expect(defaultLogger['_logLevel']).toEqual(LogLevel.ERROR)
		})
		it('should set log level passed through constructor', () => {
			const infoLogger = new LoggerStrategyConsole({ logLevel: LogLevel.INFO })
			expect(infoLogger['_logLevel']).toEqual(LogLevel.INFO)
		})
	})

	describe('LogLevelToInt', () => {
		// TODO use it.each
		it('should return 0 for error', () => {
			expect(LoggerStrategyConsole.LogLevelToInt(LogLevel.ERROR)).toEqual(0)
		})
		it('should return 1 for warn', () => {
			expect(LoggerStrategyConsole.LogLevelToInt(LogLevel.WARN)).toEqual(1)
		})
		it('should return 2 for info', () => {
			expect(LoggerStrategyConsole.LogLevelToInt(LogLevel.INFO)).toEqual(2)
		})
		it('should return 3 for debug', () => {
			expect(LoggerStrategyConsole.LogLevelToInt(LogLevel.DEBUG)).toEqual(3)
		})
		it('should throw error if unknown level passed', () => {
			const notALogLevel = 'not a log level'
			try {
				expect(LoggerStrategyConsole.LogLevelToInt(notALogLevel as any)).toEqual(1)
				expect.fail('LogLevelToInt did not throw error')
			} catch (err) {
				if (!(err instanceof Error)) {
					throw err
				}
				expect(err.message).toEqual(`Unknown log lever [${notALogLevel}]`)
			}
		})
	})

	describe('_shouldLog', () => {
		const { ERROR, WARN, INFO, DEBUG } = LogLevel
		const testCases: [LogLevel, LogLevel, boolean][] = [
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
		]

		it.each(testCases)(
			'should return decide to log message if config level is %s and message level is %s as %p',
			(confLevel, msgLevel, shouldLog) => {
				const logger = new LoggerStrategyConsole({ logLevel: confLevel })
				expect(logger['_shouldLog'](msgLevel)).toEqual(shouldLog)
			}
		)
	})

	describe('_logMessage', () => {
		let spy_logger_shouldLog: jest.SpyInstance

		const consoleLogStrategy = new ConsoleLogStrategyMock()
		const logMessageLogger = new LoggerStrategyConsole({ consoleLogStrategy })

		beforeEach(() => {
			spy_logger_shouldLog = jest.spyOn(logMessageLogger, '_shouldLog' as any)
		})
		afterEach(() => jest.resetAllMocks())
		afterAll(() => jest.restoreAllMocks())

		it('should not log messages if shouldLog returns false', () => {
			spy_logger_shouldLog.mockReturnValue(false)
			logMessageLogger['_logMessage'](LogLevel.ERROR, 'test message')
			expect(spy_logger_shouldLog).toHaveBeenCalledTimes(1)
			expect(spy_logger_shouldLog).toHaveBeenCalledWith(LogLevel.ERROR)
			expect(consoleLogStrategy.log).not.toHaveBeenCalled()
		})

		it('should log only string message if no object passed', () => {
			spy_logger_shouldLog.mockReturnValue(true)
			logMessageLogger['_logMessage'](LogLevel.ERROR, 'test message')
			expect(spy_logger_shouldLog).toHaveBeenCalledTimes(1)
			expect(spy_logger_shouldLog).toHaveBeenCalledWith(LogLevel.ERROR)
			expect(consoleLogStrategy.log).toHaveBeenCalledTimes(1)
			expect(consoleLogStrategy.log).toHaveBeenCalledWith(
				{ meta: undefined, prefix: undefined, type: LogLevel.ERROR },
				'test message'
			)
		})
	})

	describe('public functions', () => {
		let spy_logger_logMessage: jest.SpyInstance

		const logger = new LoggerStrategyConsole()
		const dummyMessage = 'dummy message'
		const dummyObject = { dummy: 'object' }
		beforeEach(() => {
			jest.spyOn(console, 'log').mockImplementation(jest.fn)
			jest.spyOn(console, 'error').mockImplementation(jest.fn)
			jest.spyOn(console, 'warn').mockImplementation(jest.fn)
			jest.spyOn(console, 'info').mockImplementation(jest.fn)
			spy_logger_logMessage = jest.spyOn(logger, '_logMessage' as any)
		})
		afterEach(() => jest.resetAllMocks())
		afterAll(() => jest.restoreAllMocks())

		it('should call logger with error level for error', () => {
			logger.error(dummyMessage, dummyObject)
			expect(spy_logger_logMessage).toHaveBeenCalledTimes(1)
			expect(spy_logger_logMessage).toHaveBeenCalledWith(LogLevel.ERROR, dummyMessage, dummyObject)
		})

		it('should call logger with warn level for warn', () => {
			logger.warn(dummyMessage, dummyObject)
			expect(spy_logger_logMessage).toHaveBeenCalledTimes(1)
			expect(spy_logger_logMessage).toHaveBeenCalledWith(LogLevel.WARN, dummyMessage, dummyObject)
		})

		it('should call logger with info level for info', () => {
			logger.info(dummyMessage, dummyObject)
			expect(spy_logger_logMessage).toHaveBeenCalledTimes(1)
			expect(spy_logger_logMessage).toHaveBeenCalledWith(LogLevel.INFO, dummyMessage, dummyObject)
		})

		it('should call logger with debug level for debug', () => {
			logger.debug(dummyMessage, dummyObject)
			expect(spy_logger_logMessage).toHaveBeenCalledTimes(1)
			expect(spy_logger_logMessage).toHaveBeenCalledWith(LogLevel.DEBUG, dummyMessage, dummyObject)
		})
	})

	describe('clone', () => {
		it('should just clone logger', () => {
			const toClone = new LoggerStrategyConsole({
				consoleLogStrategy: new ConsoleLogStrategySimple(),
				logLevel: LogLevel.DEBUG,
				messagePrefix: 'somePrefix',
				meta: { some: 'meta' },
			})

			const clonedLogger = toClone.clone()

			expect(clonedLogger['_meta']).toEqual({ some: 'meta' }) // TODO Deep equal
			expect(clonedLogger['_messagePrefix']).toEqual('somePrefix')
			expect(clonedLogger['_logLevel']).toEqual(LogLevel.DEBUG)
			expect(clonedLogger['_consoleLogStrategy'] instanceof ConsoleLogStrategySimple).toBeTruthy()
			expect(clonedLogger).not.toBe(toClone)
		})
		it('should override all values', () => {
			const toClone = new LoggerStrategyConsole({
				consoleLogStrategy: new ConsoleLogStrategySimple(),
				logLevel: LogLevel.DEBUG,
				messagePrefix: 'somePrefix',
				meta: { some: 'meta' },
			})

			const clonedLogger = toClone.clone({
				logLevel: LogLevel.INFO,
				messagePrefix: 'overridePrefix',
				meta: { additional: 'data' },
			})

			expect(clonedLogger['_meta']).toEqual({ additional: 'data', some: 'meta' }) // TODO deep equal
			expect(clonedLogger['_messagePrefix']).toEqual('overridePrefix')
			expect(clonedLogger['_logLevel']).toEqual(LogLevel.INFO)
			expect(clonedLogger['_consoleLogStrategy'] instanceof ConsoleLogStrategySimple).toBeTruthy()
		})
	})
})
