import { LogLevelType } from '../log-level-type';
import { ObjectType, StringOrObjectType } from '../logger-strategy';
export interface ConsoleLogStrategy {
    log(params: {
        type: LogLevelType;
        messageObject: StringOrObjectType;
        meta?: ObjectType;
        datetime?: Date;
    }): void;
}
//# sourceMappingURL=console-log-strategy.d.ts.map