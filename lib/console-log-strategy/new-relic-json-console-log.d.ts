import { LogLevelType } from '../log-level-type';
import { StringOrObjectType } from '../logger-strategy';
import { ConsoleLogStrategy } from './console-log-strategy';
export declare class NewRelicJsonConsoleLog implements ConsoleLogStrategy {
    log(params: {
        type: LogLevelType;
        messageObject: StringOrObjectType;
        meta?: StringOrObjectType;
        datetime?: Date;
    }): void;
}
//# sourceMappingURL=new-relic-json-console-log.d.ts.map