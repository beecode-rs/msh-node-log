import { ConsoleLogStrategy } from './console-log-strategy/console-log-strategy'
import { SimpleConsoleLog } from './console-log-strategy/simple-console-log'
import { LogLevelType } from './log-level-type'
import { LoggerStrategy, StringOrObjectType } from './logger-strategy'
import { typeUtil } from './util/type-util'

export class ConsoleLogger implements LoggerStrategy {
  protected readonly _logLevel: LogLevelType
  protected readonly _consoleLogStrategy: ConsoleLogStrategy

  constructor(params: { logLevel?: LogLevelType; consoleLogStrategy?: ConsoleLogStrategy } = {}) {
    const { logLevel = LogLevelType.ERROR, consoleLogStrategy = new SimpleConsoleLog() } = params

    this._logLevel = logLevel
    this._consoleLogStrategy = consoleLogStrategy
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

  protected _logMessage(type: LogLevelType, messageObject: StringOrObjectType, meta?: StringOrObjectType): void {
    if (!this._shouldLog(type)) return
    this._consoleLogStrategy.log({ type, messageObject, meta })
  }

  public debug(messageObject: StringOrObjectType, meta?: StringOrObjectType): void {
    this._logMessage(LogLevelType.DEBUG, messageObject, meta)
  }

  public info(messageObject: StringOrObjectType, meta?: StringOrObjectType): void {
    this._logMessage(LogLevelType.INFO, messageObject, meta)
  }

  public warn(messageObject: StringOrObjectType, meta?: StringOrObjectType): void {
    this._logMessage(LogLevelType.WARN, messageObject, meta)
  }

  public error(messageObject: StringOrObjectType, meta?: StringOrObjectType): void {
    this._logMessage(LogLevelType.ERROR, messageObject, meta)
  }
}
