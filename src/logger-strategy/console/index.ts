import { typeUtil } from '@beecode/msh-util/lib/type-util'
import { LogLevel } from 'src/log-level'
import { LoggerStrategy, LoggerStrategyParams, ObjectType, StringOrObjectType } from 'src/logger-strategy'
import { ConsoleLogStrategy } from 'src/logger-strategy/console/log-strategy'
import { ConsoleLogStrategySimple } from 'src/logger-strategy/console/log-strategy/simple'

export type ConsoleLoggerParams = {
	consoleLogStrategy?: ConsoleLogStrategy
} & LoggerStrategyParams

export class LoggerStrategyConsole implements LoggerStrategy {
	protected readonly _logLevel: LogLevel
	protected readonly _consoleLogStrategy: ConsoleLogStrategy
	protected readonly _messagePrefix?: string
	protected readonly _meta?: ObjectType

	constructor(params?: ConsoleLoggerParams) {
		const { logLevel = LogLevel.ERROR, consoleLogStrategy = new ConsoleLogStrategySimple(), messagePrefix, meta } = params ?? {}

		this._logLevel = logLevel
		this._consoleLogStrategy = consoleLogStrategy
		this._messagePrefix = messagePrefix
		this._meta = meta
	}

	clone(params?: LoggerStrategyParams): LoggerStrategyConsole {
		const { meta, messagePrefix, logLevel } = params ?? {}

		return new LoggerStrategyConsole({
			logLevel: logLevel ?? this._logLevel,
			messagePrefix: messagePrefix ?? this._messagePrefix,
			meta: (this._meta || meta) && { ...this._meta, ...meta },
		})
	}

	static LogLevelToInt(logLevel: LogLevel): number {
		switch (logLevel) {
			case LogLevel.ERROR:
				return 0
			case LogLevel.WARN:
				return 1
			case LogLevel.INFO:
				return 2
			case LogLevel.DEBUG:
				return 3
			default:
				throw typeUtil.exhaustiveError(`Unknown log lever [${logLevel}]`, logLevel)
		}
	}

	protected _shouldLog(currentLevel: LogLevel): boolean {
		return LoggerStrategyConsole.LogLevelToInt(this._logLevel) >= LoggerStrategyConsole.LogLevelToInt(currentLevel)
	}

	protected _logMessage(type: LogLevel, ...messageObjects: StringOrObjectType[]): void {
		if (!this._shouldLog(type)) {
			return
		}
		this._consoleLogStrategy.log({ meta: this._meta, prefix: this._messagePrefix, type }, ...messageObjects)
	}

	debug(...messageObjects: StringOrObjectType[]): void {
		this._logMessage(LogLevel.DEBUG, ...messageObjects)
	}

	info(...messageObjects: StringOrObjectType[]): void {
		this._logMessage(LogLevel.INFO, ...messageObjects)
	}

	warn(...messageObjects: StringOrObjectType[]): void {
		this._logMessage(LogLevel.WARN, ...messageObjects)
	}

	error(...messageObjects: StringOrObjectType[]): void {
		this._logMessage(LogLevel.ERROR, ...messageObjects)
	}
}
