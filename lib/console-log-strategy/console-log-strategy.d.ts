import { LogLevelType } from '../log-level-type';
import { ObjectType, StringOrObjectType } from '../logger-strategy';
export interface ConsoleLogStrategy {
    log(params: {
        type: LogLevelType;
        meta?: ObjectType;
        datetime?: Date;
        prefix?: string;
    }, ...messageObjects: StringOrObjectType[]): void;
}
//# sourceMappingURL=console-log-strategy.d.ts.map