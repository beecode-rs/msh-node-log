import { LoggerStrategy } from './logger-strategy';
export declare enum LogLevelType {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug"
}
export declare type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
export declare class ConsoleLogger implements LoggerStrategy {
    protected _logLevel: LogLevelType;
    constructor(logLevel?: LogLevelType | LogLevel);
    protected _logLevelToInt: (logLevel: LogLevelType) => number;
    protected _shouldLog: (currentLevel: LogLevelType) => boolean;
    protected _consoleLog(msg: any, obj?: any): void;
    protected _logMessage: (type: LogLevelType, msg: any, obj?: any) => void;
    debug(msg: any, obj?: any): void;
    info(msg: any, obj?: any): void;
    warn(msg: any, obj?: any): void;
    error(msg: any, obj?: any): void;
}
//# sourceMappingURL=console-logger.d.ts.map