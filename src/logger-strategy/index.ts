import { LogLevel } from 'src/log-level'

export type ObjectType = Record<string, any>

export type StringOrObjectType = string | ObjectType

export type LoggerStrategyParams = {
	logLevel?: LogLevel
	messagePrefix?: string
	meta?: ObjectType
}

export interface LoggerStrategy {
	debug(...messageObjects: StringOrObjectType[]): void
	info(...messageObjects: StringOrObjectType[]): void
	warn(...messageObjects: StringOrObjectType[]): void
	error(...messageObjects: StringOrObjectType[]): void
	clone(overrideParams?: LoggerStrategyParams): LoggerStrategy
}
