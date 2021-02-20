import { LoggerStrategy } from './logger-strategy'

export class NoLogger implements LoggerStrategy {
  public debug(_: any, __?: any): void {} // eslint-disable-line
  public error(_: any, __?: any): void {} // eslint-disable-line
  public info(_: any, __?: any): void {} // eslint-disable-line
  public warn(_: any, __?: any): void {} // eslint-disable-line
}
