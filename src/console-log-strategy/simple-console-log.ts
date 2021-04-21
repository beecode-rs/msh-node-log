import { LogLevelType } from '../log-level-type'
import { ObjectType, StringOrObjectType } from '../logger-strategy'
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
    if (typeof messageObject === 'object') console.log(`${datetime.toISOString()} - ${type.toUpperCase()}:`, messageObject)
    else console.log(`${datetime.toISOString()} - ${type.toUpperCase()}: ${messageObject}`)

    if (meta) console.log(meta)
    /* eslint-enable no-console*/
  }
}
