import { LogLevelType } from '../log-level-type'
import { StringOrObjectType } from '../logger-strategy'
import { ConsoleLogStrategy } from './console-log-strategy'

export class NewRelicJsonConsoleLog implements ConsoleLogStrategy {
  public log(params: {
    type: LogLevelType
    messageObject: StringOrObjectType
    meta?: StringOrObjectType
    datetime?: Date
  }): void {
    const { type, messageObject, meta, datetime = new Date() } = params

    const metaObject = typeof meta === 'string' ? { meta } : meta

    let payload = {
      logtype: type.toString(),
      timestamp: datetime.getTime(),
    } as any

    if (typeof messageObject === 'object') payload = { ...messageObject, ...payload }
    else payload.message = messageObject

    if (meta) payload = { ...metaObject, ...payload }

    console.log(JSON.stringify(payload)) // eslint-disable-line no-console
  }
}
