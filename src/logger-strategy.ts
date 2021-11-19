import { LogLevelType } from './log-level-type'

export type ObjectType = { [key: string]: any }
export type StringOrObjectType = string | ObjectType

export type LoggerStrategyParams = {
  logLevel?: LogLevelType
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
