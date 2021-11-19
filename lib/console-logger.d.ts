import { ConsoleLogStrategy } from './console-log-strategy/console-log-strategy';
import { LogLevelType } from './log-level-type';
import { LoggerStrategy, LoggerStrategyParams, ObjectType, StringOrObjectType } from './logger-strategy';
export declare type ConsoleLoggerParams = {
    consoleLogStrategy?: ConsoleLogStrategy;
} & LoggerStrategyParams;
export declare class ConsoleLogger implements LoggerStrategy {
    protected readonly _logLevel: LogLevelType;
    protected readonly _consoleLogStrategy: ConsoleLogStrategy;
    protected readonly _messagePrefix?: string;
    protected readonly _meta?: ObjectType;
    constructor({ logLevel, consoleLogStrategy, messagePrefix, meta, }?: ConsoleLoggerParams);
    clone(params?: LoggerStrategyParams): LoggerStrategy;
    static LogLevelToInt(logLevel: LogLevelType): number;
    protected _shouldLog(currentLevel: LogLevelType): boolean;
    protected _logMessage(type: LogLevelType, ...messageObjects: StringOrObjectType[]): void;
    debug(...messageObjects: StringOrObjectType[]): void;
    info(...messageObjects: StringOrObjectType[]): void;
    warn(...messageObjects: StringOrObjectType[]): void;
    error(...messageObjects: StringOrObjectType[]): void;
}
//# sourceMappingURL=console-logger.d.ts.map