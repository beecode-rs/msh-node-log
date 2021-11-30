import { ConsoleLogStrategy } from './console-log-strategy/console-log-strategy'
import { SimpleConsoleLog } from './console-log-strategy/simple-console-log'
import { LogLevelType } from './log-level-type'
import { LoggerStrategy, LoggerStrategyParams, ObjectType, StringOrObjectType } from './logger-strategy'
import { typeUtil } from './util/type-util'

export type ConsoleLoggerParams = {
  consoleLogStrategy?: ConsoleLogStrategy
} & LoggerStrategyParams

export class ConsoleLogger implements LoggerStrategy {
  protected readonly _logLevel: LogLevelType
  protected readonly _consoleLogStrategy: ConsoleLogStrategy
  protected readonly _messagePrefix?: string
  protected readonly _meta?: ObjectType

  public constructor({
    logLevel = LogLevelType.ERROR,
    consoleLogStrategy = new SimpleConsoleLog(),
    messagePrefix,
    meta,
  }: ConsoleLoggerParams = {}) {
    this._logLevel = logLevel
    this._consoleLogStrategy = consoleLogStrategy
    this._messagePrefix = messagePrefix
    this._meta = meta
  }

  public clone(params: LoggerStrategyParams = {}): LoggerStrategy {
    return new ConsoleLogger({
      meta: (this._meta || params.meta) && { ...this._meta, ...params.meta },
      messagePrefix: params.messagePrefix ?? this._messagePrefix,
      logLevel: params.logLevel ?? this._logLevel,
    })
  }

  public static LogLevelToInt(logLevel: LogLevelType): number {
    switch (logLevel) {
      case LogLevelType.ERROR:
        return 0
      case LogLevelType.WARN:
        return 1
      case LogLevelType.INFO:
        return 2
      case LogLevelType.DEBUG:
        return 3
      default:
        throw typeUtil.exhaustiveCheck(`Unknown log lever`, logLevel)
    }
  }

  protected _shouldLog(currentLevel: LogLevelType): boolean {
    return ConsoleLogger.LogLevelToInt(this._logLevel) >= ConsoleLogger.LogLevelToInt(currentLevel)
  }

  protected _logMessage(type: LogLevelType, ...messageObjects: StringOrObjectType[]): void {
    if (!this._shouldLog(type)) return
    this._consoleLogStrategy.log({ type, meta: this._meta, prefix: this._messagePrefix }, ...messageObjects)
  }

  public debug(...messageObjects: StringOrObjectType[]): void {
    this._logMessage(LogLevelType.DEBUG, ...messageObjects)
  }

  public info(...messageObjects: StringOrObjectType[]): void {
    this._logMessage(LogLevelType.INFO, ...messageObjects)
  }

  public warn(...messageObjects: StringOrObjectType[]): void {
    this._logMessage(LogLevelType.WARN, ...messageObjects)
  }

  public error(...messageObjects: StringOrObjectType[]): void {
    this._logMessage(LogLevelType.ERROR, ...messageObjects)
  }
}
