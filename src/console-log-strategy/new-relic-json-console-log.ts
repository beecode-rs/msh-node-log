import { LogLevelType } from '../log-level-type'
import { ObjectType, StringOrObjectType } from '../logger-strategy'
import { ConsoleLogStrategy } from './console-log-strategy'

export class NewRelicJsonConsoleLog implements ConsoleLogStrategy {
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
    let payload = {
      logtype: type.toString(),
      timestamp: datetime.getTime(),
    } as any

    if (typeof messageObject === 'object') payload = { ...messageObject, ...payload }
    else payload.message = messageObject

    if (meta) payload = { ...meta, ...payload }

    console.log(JSON.stringify(payload)) // eslint-disable-line no-console
  }
}
