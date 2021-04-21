import { LoggerStrategy, ObjectType, StringOrObjectType } from './logger-strategy'

export class NoLogger implements LoggerStrategy {
  public debug(_: StringOrObjectType, __?: ObjectType): void {} // eslint-disable-line
  public error(_: StringOrObjectType, __?: ObjectType): void {} // eslint-disable-line
  public info(_: StringOrObjectType, __?: ObjectType): void {} // eslint-disable-line
  public warn(_: StringOrObjectType, __?: ObjectType): void {} // eslint-disable-line
}
