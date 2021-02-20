import { LoggerStrategy } from './logger-strategy'

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export class ConsoleLogger implements LoggerStrategy {
  public constructor(protected _logLevel: LogLevel = LogLevel.ERROR) {}

  protected _logLevelToInt = (logLevel: LogLevel): number => {
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
        throw new Error(`Unknown log lever [${logLevel}]`)
    }
  }

  protected _shouldLog = (currentLevel: LogLevel): boolean => {
    return this._logLevelToInt(this._logLevel) >= this._logLevelToInt(currentLevel)
  }

  protected _consoleLog(msg: any, obj?: any): void {
    console.log(msg, obj) // eslint-disable-line no-console
  }

  protected _logMessage = (type: LogLevel, msg: any, obj?: any): void => {
    if (!this._shouldLog(type)) return
    if (typeof msg === 'string') this._consoleLog(`${type.toUpperCase()}: ${msg}`)
    else this._consoleLog(`${type.toUpperCase()}:`, msg)
    if (obj) this._consoleLog(obj)
  }

  public debug(msg: any, obj?: any): void {
    this._logMessage(LogLevel.DEBUG, msg, obj)
  }

  public info(msg: any, obj?: any): void {
    this._logMessage(LogLevel.INFO, msg, obj)
  }

  public warn(msg: any, obj?: any): void {
    this._logMessage(LogLevel.WARN, msg, obj)
  }

  public error(msg: any, obj?: any): void {
    this._logMessage(LogLevel.ERROR, msg, obj)
  }
}
