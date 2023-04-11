import { LoggerStrategy, LoggerStrategyParams, StringOrObjectType } from 'src/logger-strategy'

export class LoggerStrategyVoid implements LoggerStrategy {
	debug(_: StringOrObjectType, __?: StringOrObjectType): void {} // eslint-disable-line
	error(_: StringOrObjectType, __?: StringOrObjectType): void {} // eslint-disable-line
	info(_: StringOrObjectType, __?: StringOrObjectType): void {} // eslint-disable-line
	warn(_: StringOrObjectType, __?: StringOrObjectType): void {} // eslint-disable-line
	// eslint-disable-next-line
	clone(_?: LoggerStrategyParams): LoggerStrategyVoid {
		return new LoggerStrategyVoid()
	}
}
