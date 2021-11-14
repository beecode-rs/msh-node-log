import { LogLevelType } from '../log-level-type';
import { StringOrObjectType } from '../logger-strategy';
import { ConsoleLogStrategy } from './console-log-strategy';
export declare class SimpleConsoleLog implements ConsoleLogStrategy {
    log(params: {
        type: LogLevelType;
        messageObject: StringOrObjectType;
        meta?: StringOrObjectType;
        datetime?: Date;
    }): void;
    static LogTypeToFunction(type: LogLevelType): 'log' | 'info' | 'warn' | 'error';
}
//# sourceMappingURL=simple-console-log.d.ts.map