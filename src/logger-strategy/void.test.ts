import { LoggerStrategyVoid } from 'src/logger-strategy/void'

describe('LoggerStrategyVoid', () => {
	describe('should not call logger', () => {
		let spy_console_log: jest.SpyInstance
		const logger = new LoggerStrategyVoid()
		const dummyMessage = 'dummyMessage'
		const dummyObject = { dummy: 'object' }

		beforeEach(() => {
			spy_console_log = jest.spyOn(console, 'log').mockImplementation(jest.fn)
		})

		afterEach(() => jest.resetAllMocks())
		afterAll(() => jest.restoreAllMocks())

		it('should not log on error', () => {
			logger.error(dummyMessage, dummyObject)
			expect(spy_console_log).not.toHaveBeenCalled()
		})

		it('should not log on warn', () => {
			logger.warn(dummyMessage, dummyObject)
			expect(spy_console_log).not.toHaveBeenCalled()
		})

		it('should not log on info', () => {
			logger.info(dummyMessage, dummyObject)
			expect(spy_console_log).not.toHaveBeenCalled()
		})

		it('should not log on debug', () => {
			logger.debug(dummyMessage, dummyObject)
			expect(spy_console_log).not.toHaveBeenCalled()
		})
	})

	describe('clone', () => {
		it('should just clone logger', () => {
			const toClone = new LoggerStrategyVoid()
			const clonedLogger = toClone.clone()
			expect(clonedLogger).not.toBe(toClone)
		})
	})
})
