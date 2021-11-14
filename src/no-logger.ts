import { LoggerStrategy, StringOrObjectType } from './logger-strategy'

export class NoLogger implements LoggerStrategy {
  public debug(_: StringOrObjectType, __?: StringOrObjectType): void {} // eslint-disable-line
  public error(_: StringOrObjectType, __?: StringOrObjectType): void {} // eslint-disable-line
  public info(_: StringOrObjectType, __?: StringOrObjectType): void {} // eslint-disable-line
  public warn(_: StringOrObjectType, __?: StringOrObjectType): void {} // eslint-disable-line
}
