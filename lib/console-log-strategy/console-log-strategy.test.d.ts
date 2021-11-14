import { LogLevelType } from '../log-level-type';
import { StringOrObjectType } from '../logger-strategy';
import { SinonSandbox, SinonStub } from 'sinon';
export interface MockConsoleLogStrategy {
    log: SinonStub<{
        type: LogLevelType;
        messageObject: StringOrObjectType;
        meta?: StringOrObjectType;
        datetime?: Date;
    }[], void>;
}
export declare const mockConsoleLogStrategyFactory: (sandbox: SinonSandbox) => any;
//# sourceMappingURL=console-log-strategy.test.d.ts.map