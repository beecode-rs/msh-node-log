import { LogLevelType } from '../log-level-type';
import { ObjectType, StringOrObjectType } from '../logger-strategy';
import { ConsoleLogStrategy } from './console-log-strategy';
export declare class SimpleConsoleLog implements ConsoleLogStrategy {
    log(params: {
        type: LogLevelType;
        meta?: ObjectType;
        datetime?: Date;
        prefix?: string;
    }, ...msgs: StringOrObjectType[]): void;
    static LogTypeToFunction(type: LogLevelType): 'log' | 'info' | 'warn' | 'error';
}
//# sourceMappingURL=simple-console-log.d.ts.map