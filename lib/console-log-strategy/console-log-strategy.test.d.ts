import { LogLevelType } from '../log-level-type';
import { ObjectType, StringOrObjectType } from '../logger-strategy';
import { SinonSandbox, SinonStub } from 'sinon';
export interface MockConsoleLogStrategy {
    log: SinonStub<{
        type: LogLevelType;
        messageObject: StringOrObjectType;
        meta?: ObjectType;
        datetime?: Date;
    }[], void>;
}
export declare const mockConsoleLogStrategyFactory: (sandbox: SinonSandbox) => any;
//# sourceMappingURL=console-log-strategy.test.d.ts.map