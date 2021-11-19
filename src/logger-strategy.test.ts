import { LoggerStrategy } from './logger-strategy'
import { SinonSandbox, SinonStub } from 'sinon'

export interface MockLoggerStrategy {
  debug: SinonStub<any[], void>
  error: SinonStub<any[], void>
  info: SinonStub<any[], void>
  warn: SinonStub<any[], void>
}

export const mockLoggerStrategyFactory = (sandbox: SinonSandbox): any => {
  const stub_constructor = sandbox.stub()
  return class implements LoggerStrategy, MockLoggerStrategy {
    public static STUB_CONSTRUCTOR = stub_constructor
    public constructor(...args: any[]) {
      stub_constructor(...args)
    }

    public debug = sandbox.stub()
    public error = sandbox.stub()
    public info = sandbox.stub()
    public warn = sandbox.stub()
    public clone = sandbox.stub()
  }
}
