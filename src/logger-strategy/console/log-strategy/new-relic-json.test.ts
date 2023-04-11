import { ObjectUtil } from '@beecode/msh-util/lib/object-util'
import { LogLevel } from 'src/log-level'
import { ConsoleLogStrategyNewRelicJson } from 'src/logger-strategy/console/log-strategy/new-relic-json'

describe('NewRelicConsoleLog', () => {
	let spy_console_log: jest.SpyInstance
	const objectUtil = new ObjectUtil()
	const deepStringify = (obj: any): string => {
		return objectUtil.deepStringify(obj, { isSorted: true })
	}

	const newRelicJsonConsoleLog = new ConsoleLogStrategyNewRelicJson()
	const mockDateTime = new Date()
	const mockTimeStamp = mockDateTime.getTime()

	beforeEach(() => {
		spy_console_log = jest.spyOn(console, 'log').mockImplementation(jest.fn)
	})
	afterEach(() => jest.resetAllMocks())
	afterAll(() => jest.restoreAllMocks())

	describe('log', () => {
		it('should call console.log with string', () => {
			const msg = 'test'
			newRelicJsonConsoleLog.log({ datetime: mockDateTime, type: LogLevel.ERROR }, msg)
			expect(spy_console_log).toHaveBeenCalledTimes(1)
			expect(spy_console_log).toHaveBeenCalledWith(
				deepStringify({ logtype: LogLevel.ERROR, message: msg, timestamp: mockTimeStamp })
			)
		})

		it('should call console.log with object', () => {
			const obj = { test: 'test' }
			newRelicJsonConsoleLog.log({ datetime: mockDateTime, type: LogLevel.INFO }, obj)
			expect(spy_console_log).toHaveBeenCalledTimes(1)
			expect(spy_console_log).toHaveBeenCalledWith(deepStringify({ logtype: LogLevel.INFO, timestamp: mockTimeStamp, ...obj }))
		})

		it('should call console.log with message and meta', () => {
			const msg = 'test'
			const metaObj = { test: 'test' }
			newRelicJsonConsoleLog.log({ datetime: mockDateTime, meta: metaObj, type: LogLevel.DEBUG }, msg)
			expect(spy_console_log).toHaveBeenCalledTimes(1)
			expect(spy_console_log).toHaveBeenCalledWith(
				deepStringify({ ...metaObj, logtype: LogLevel.DEBUG, message: msg, timestamp: mockTimeStamp })
			)
		})

		it('1. should call console.log with string message and prefix', () => {
			const msg = 'test'
			const prefix = 'Prefix'
			const metaObj = { test: 'test' }
			newRelicJsonConsoleLog.log({ datetime: mockDateTime, meta: metaObj, prefix, type: LogLevel.DEBUG }, msg)
			expect(spy_console_log).toHaveBeenCalledTimes(1)
			expect(spy_console_log).toHaveBeenCalledWith(
				deepStringify({ ...metaObj, logtype: LogLevel.DEBUG, message: `${prefix} ${msg}`, timestamp: mockTimeStamp })
			)
		})

		it('should call console.log with object message and prefix {someMessage:string}', () => {
			const msg = { someMessage: 'test' }
			const prefix = 'Prefix'
			const metaObj = { test: 'test' }
			newRelicJsonConsoleLog.log({ datetime: mockDateTime, meta: metaObj, prefix, type: LogLevel.DEBUG }, msg)
			expect(spy_console_log).toHaveBeenCalledTimes(1)
			expect(spy_console_log).toHaveBeenCalledWith(
				deepStringify({ ...metaObj, logtype: LogLevel.DEBUG, timestamp: mockTimeStamp, ...msg, message: prefix })
			)
		})

		it('should call console.log with object message and prefix {message:string}', () => {
			const msg = { message: 'test' }
			const prefix = 'Prefix'
			const metaObj = { test: 'test' }
			newRelicJsonConsoleLog.log({ datetime: mockDateTime, meta: metaObj, prefix, type: LogLevel.DEBUG }, msg)
			expect(spy_console_log).toHaveBeenCalledTimes(1)
			expect(spy_console_log).toHaveBeenCalledWith(
				deepStringify({
					...metaObj,
					logtype: LogLevel.DEBUG,
					timestamp: mockTimeStamp,
					...msg,
					message: `${prefix} ${msg.message}`,
				})
			)
		})

		it('2. should call console.log with string message and prefix', () => {
			const msg = 'test'
			const prefix = 'Prefix'
			const metaObj = { test: 'test' }
			newRelicJsonConsoleLog.log({ datetime: mockDateTime, meta: metaObj, prefix, type: LogLevel.DEBUG }, msg)
			expect(spy_console_log).toHaveBeenCalledTimes(1)
			expect(spy_console_log).toHaveBeenCalledWith(
				deepStringify({ ...metaObj, logtype: LogLevel.DEBUG, message: `${prefix} ${msg}`, timestamp: mockTimeStamp })
			)
		})

		it('should call console.log with multi string message and meta', () => {
			const msg = 'test'
			const msg1 = 'test1'
			const msg2 = 'test2'
			const metaObj = { test: 'test' }
			newRelicJsonConsoleLog.log({ datetime: mockDateTime, meta: metaObj, type: LogLevel.DEBUG }, msg, msg1, msg2)
			expect(spy_console_log).toHaveBeenCalledTimes(3)
			expect(spy_console_log).nthCalledWith(
				1,
				deepStringify({ ...metaObj, logtype: LogLevel.DEBUG, message: msg, timestamp: mockTimeStamp })
			)
			expect(spy_console_log).nthCalledWith(
				2,
				deepStringify({ ...metaObj, logtype: LogLevel.DEBUG, message: msg1, timestamp: mockTimeStamp })
			)
			expect(spy_console_log).nthCalledWith(
				3,
				deepStringify({ ...metaObj, logtype: LogLevel.DEBUG, message: msg2, timestamp: mockTimeStamp })
			)
		})
	})
})
