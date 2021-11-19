import { LogLevelType } from '../log-level-type';
import { ObjectType, StringOrObjectType } from '../logger-strategy';
import { ConsoleLogStrategy } from './console-log-strategy';
export declare class NewRelicJsonConsoleLog implements ConsoleLogStrategy {
    log(params: {
        type: LogLevelType;
        meta?: ObjectType;
        datetime?: Date;
        prefix?: string;
    }, ...msgs: StringOrObjectType[]): void;
    protected _joinDefined(prefix?: string, msg?: string): string;
}
//# sourceMappingURL=new-relic-json-console-log.d.ts.map