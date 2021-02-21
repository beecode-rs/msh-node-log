import { LoggerStrategy } from './logger-strategy'

export enum LogLevelType {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'

export class ConsoleLogger implements LoggerStrategy {
  protected _logLevel: LogLevelType

  public constructor(logLevel?: LogLevelType | LogLevel) {
    if (typeof logLevel === 'string') {
      this._logLevel = LogLevelType[logLevel.toUpperCase()]
    } else {
      this._logLevel = logLevel ?? LogLevelType.ERROR
    }

    if (!this._logLevel) throw new Error(`Unknown log level [${logLevel}]. Allowed values ['error' | 'warn' | 'info' | 'debug']`)
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

  protected _consoleLog(msg: any, obj?: any): void {
    console.log(msg, obj) // eslint-disable-line no-console
  }

  protected _logMessage = (type: LogLevelType, msg: any, obj?: any): void => {
    if (!this._shouldLog(type)) return
    if (typeof msg === 'string') {
      this._consoleLog(`${type.toUpperCase()}: ${msg}`)
    } else {
      this._consoleLog(`${type.toUpperCase()}:`, msg)
    }
    if (obj) this._consoleLog(obj)
  }

  public debug(msg: any, obj?: any): void {
    this._logMessage(LogLevelType.DEBUG, msg, obj)
  }

  public info(msg: any, obj?: any): void {
    this._logMessage(LogLevelType.INFO, msg, obj)
  }

  public warn(msg: any, obj?: any): void {
    this._logMessage(LogLevelType.WARN, msg, obj)
  }

  public error(msg: any, obj?: any): void {
    this._logMessage(LogLevelType.ERROR, msg, obj)
  }
}
