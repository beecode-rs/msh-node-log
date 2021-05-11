import { LogLevelType } from '../log-level-type'
import { ObjectType, StringOrObjectType } from '../logger-strategy'
import { util } from '../util'
import { ConsoleLogStrategy } from './console-log-strategy'

export class SimpleConsoleLog implements ConsoleLogStrategy {
  log({
    type,
    messageObject,
    meta,
    datetime = new Date(),
  }: {
    type: LogLevelType
    messageObject: StringOrObjectType
    meta?: ObjectType
    datetime?: Date
  }): void {
    /* eslint-disable no-console*/
    const fnName = util.logTypeToFunction(type)
    if (typeof messageObject === 'object') console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}:`, messageObject)
    else console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}: ${messageObject}`)

    if (meta) console[fnName](meta)
    /* eslint-enable no-console*/
  }
}
