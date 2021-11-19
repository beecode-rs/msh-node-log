import { LogLevelType } from '../log-level-type'
import { ObjectType, StringOrObjectType } from '../logger-strategy'
import { ConsoleLogStrategy } from './console-log-strategy'

export class NewRelicJsonConsoleLog implements ConsoleLogStrategy {
  public log(
    params: { type: LogLevelType; meta?: ObjectType; datetime?: Date; prefix?: string },
    ...msgs: StringOrObjectType[]
  ): void {
    const { type, meta, prefix, datetime = new Date() } = params

    msgs.forEach((msg) => {
      const payload = {
        ...meta,
        logtype: type.toString(),
        timestamp: datetime.getTime(),
        ...(typeof msg === 'object'
          ? { ...msg, ...((prefix || msg.message) && { message: this._joinDefined(prefix, msg.message) }) }
          : { message: this._joinDefined(prefix, msg) }),
      }

      console.log(JSON.stringify(payload)) // eslint-disable-line no-console
    })
  }

  protected _joinDefined(prefix?: string, msg?: string): string {
    return [prefix, msg].filter(Boolean).join(' ')
  }
}
