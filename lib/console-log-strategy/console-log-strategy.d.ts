import { LogLevelType } from '../log-level-type';
import { StringOrObjectType } from '../logger-strategy';
export interface ConsoleLogStrategy {
    log(params: {
        type: LogLevelType;
        messageObject: StringOrObjectType;
        meta?: StringOrObjectType;
        datetime?: Date;
    }): void;
}
//# sourceMappingURL=console-log-strategy.d.ts.map