import { LogLevel } from '../../log-level';
import { LoggerStrategy, LoggerStrategyParams, ObjectType, StringOrObjectType } from '../../logger-strategy';
import { ConsoleLogStrategy } from '../../logger-strategy/console/log-strategy';
export type ConsoleLoggerParams = {
    consoleLogStrategy?: ConsoleLogStrategy;
} & LoggerStrategyParams;
export declare class LoggerStrategyConsole implements LoggerStrategy {
    protected readonly _logLevel: LogLevel;
    protected readonly _consoleLogStrategy: ConsoleLogStrategy;
    protected readonly _messagePrefix?: string;
    protected readonly _meta?: ObjectType;
    constructor(params?: ConsoleLoggerParams);
    clone(params?: LoggerStrategyParams): LoggerStrategyConsole;
    static LogLevelToInt(logLevel: LogLevel): number;
    protected _shouldLog(currentLevel: LogLevel): boolean;
    protected _logMessage(type: LogLevel, ...messageObjects: StringOrObjectType[]): void;
    debug(...messageObjects: StringOrObjectType[]): void;
    info(...messageObjects: StringOrObjectType[]): void;
    warn(...messageObjects: StringOrObjectType[]): void;
    error(...messageObjects: StringOrObjectType[]): void;
}
//# sourceMappingURL=index.d.ts.map