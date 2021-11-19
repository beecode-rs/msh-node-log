import { LogLevelType } from '../log-level-type'
import { ObjectType, StringOrObjectType } from '../logger-strategy'
import { typeUtil } from '../util/type-util'
import { ConsoleLogStrategy } from './console-log-strategy'

export class SimpleConsoleLog implements ConsoleLogStrategy {
  public log(
    params: { type: LogLevelType; meta?: ObjectType; datetime?: Date; prefix?: string },
    ...msgs: StringOrObjectType[]
  ): void {
    const { type, meta, prefix, datetime = new Date() } = params
    const fnName = SimpleConsoleLog.LogTypeToFunction(type)

    /* eslint-disable no-console*/
    msgs.forEach((msg, ix) => {
      if (ix === 0) {
        console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}: ${prefix ?? ''}`, msg)
      } else {
        console[fnName](msg)
      }
    })
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
