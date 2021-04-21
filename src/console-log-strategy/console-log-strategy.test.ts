import { LogLevelType } from '../log-level-type'
import { ObjectType, StringOrObjectType } from '../logger-strategy'
import { ConsoleLogStrategy } from './console-log-strategy'
import { SinonSandbox, SinonStub } from 'sinon'

export interface MockConsoleLogStrategy {
  log: SinonStub<{ type: LogLevelType; messageObject: StringOrObjectType; meta?: ObjectType; datetime?: Date }[], void>
}

export const mockConsoleLogStrategyFactory = (sandbox: SinonSandbox): any => {
  return class implements ConsoleLogStrategy, MockConsoleLogStrategy {
    public log = sandbox.stub()
  }
}
