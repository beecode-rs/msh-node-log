import { LogLevelType } from '../log-level-type'
import { StringOrObjectType } from '../logger-strategy'
import { typeUtil } from '../util/type-util'
import { ConsoleLogStrategy } from './console-log-strategy'

export class SimpleConsoleLog implements ConsoleLogStrategy {
  public log(params: {
    type: LogLevelType
    messageObject: StringOrObjectType
    meta?: StringOrObjectType
    datetime?: Date
  }): void {
    const { type, messageObject, meta, datetime = new Date() } = params

    const fnName = SimpleConsoleLog.LogTypeToFunction(type)

    /* eslint-disable no-console*/
    if (typeof messageObject === 'object') console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}:`, messageObject)
    else console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}: ${messageObject}`)

    if (meta) console[fnName](meta)
    /* eslint-enable no-console*/
  }

  public static LogTypeToFunction(type: LogLevelType): 'log' | 'info' | 'warn' | 'error' {
    switch (type) {
      case LogLevelType.ERROR:
        return 'error'
      case LogLevelType.WARN:
        return 'warn'
      case LogLevelType.INFO:
        return 'info'
      case LogLevelType.DEBUG:
        return 'log'
      default:
        throw typeUtil.exhaustiveCheck('Unknown log level type', type)
    }
  }
}
