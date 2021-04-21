import { ConsoleLogStrategy } from './console-log-strategy/console-log-strategy';
import { LogLevelStringType, LogLevelType } from './log-level-type';
import { LoggerStrategy, ObjectType, StringOrObjectType } from './logger-strategy';
export declare type ConsoleLoggerParams = {
    logLevel?: LogLevelType | LogLevelStringType;
    consoleLogStrategy?: ConsoleLogStrategy;
};
export declare class ConsoleLogger implements LoggerStrategy {
    protected readonly _logLevel: LogLevelType;
    protected readonly _consoleLogStrategy: ConsoleLogStrategy;
    constructor({ logLevel, consoleLogStrategy }?: ConsoleLoggerParams);
    protected _logLevelToInt: (logLevel: LogLevelType) => number;
    protected _shouldLog: (currentLevel: LogLevelType) => boolean;
    protected _logMessage: (type: LogLevelType, messageObject: StringOrObjectType, meta?: ObjectType | undefined) => void;
    debug(messageObject: StringOrObjectType, meta?: ObjectType): void;
    info(messageObject: StringOrObjectType, meta?: ObjectType): void;
    warn(messageObject: StringOrObjectType, meta?: ObjectType): void;
    error(messageObject: StringOrObjectType, meta?: ObjectType): void;
}
//# sourceMappingURL=console-logger.d.ts.map