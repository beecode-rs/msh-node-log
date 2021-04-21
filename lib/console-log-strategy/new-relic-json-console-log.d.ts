import { LogLevelType } from '../log-level-type';
import { ObjectType, StringOrObjectType } from '../logger-strategy';
import { ConsoleLogStrategy } from './console-log-strategy';
export declare class NewRelicJsonConsoleLog implements ConsoleLogStrategy {
    log({ type, messageObject, meta, datetime, }: {
        type: LogLevelType;
        messageObject: StringOrObjectType;
        meta?: ObjectType;
        datetime?: Date;
    }): void;
}
//# sourceMappingURL=new-relic-json-console-log.d.ts.map