import { ConsoleLogStrategy } from './console-log-strategy/console-log-strategy'
import { SimpleConsoleLog } from './console-log-strategy/simple-console-log'
import { LogLevelStringType, LogLevelType } from './log-level-type'
import { LoggerStrategy, ObjectType, StringOrObjectType } from './logger-strategy'

export type ConsoleLoggerParams = {
  logLevel?: LogLevelType | LogLevelStringType
  consoleLogStrategy?: ConsoleLogStrategy
}

export class ConsoleLogger implements LoggerStrategy {
  protected readonly _logLevel: LogLevelType
  protected readonly _consoleLogStrategy: ConsoleLogStrategy

  public constructor({ logLevel = LogLevelType.ERROR, consoleLogStrategy = new SimpleConsoleLog() }: ConsoleLoggerParams = {}) {
    if (typeof logLevel !== 'string')
      throw new Error("Only string value allowed for log level. Allowed values ['error' | 'warn' | 'info' | 'debug']")
    this._logLevel = LogLevelType[logLevel.toUpperCase()]
    if (!this._logLevel) throw new Error(`Unknown log level [${logLevel}]. Allowed values ['error' | 'warn' | 'info' | 'debug']`)
    this._consoleLogStrategy = consoleLogStrategy
  }

  protected _logLevelToInt = (logLevel: LogLevelType): number => {
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
        throw new Error(`Unknown log lever [${logLevel}]`)
    }
  }

  protected _shouldLog = (currentLevel: LogLevelType): boolean => {
    return this._logLevelToInt(this._logLevel) >= this._logLevelToInt(currentLevel)
  }

  protected _logMessage = (type: LogLevelType, messageObject: StringOrObjectType, meta?: ObjectType): void => {
    if (!this._shouldLog(type)) return
    this._consoleLogStrategy.log({ type, messageObject, meta })
  }

  public debug(messageObject: StringOrObjectType, meta?: ObjectType): void {
    this._logMessage(LogLevelType.DEBUG, messageObject, meta)
  }

  public info(messageObject: StringOrObjectType, meta?: ObjectType): void {
    this._logMessage(LogLevelType.INFO, messageObject, meta)
  }

  public warn(messageObject: StringOrObjectType, meta?: ObjectType): void {
    this._logMessage(LogLevelType.WARN, messageObject, meta)
  }

  public error(messageObject: StringOrObjectType, meta?: ObjectType): void {
    this._logMessage(LogLevelType.ERROR, messageObject, meta)
  }
}
