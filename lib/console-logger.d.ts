import { LoggerStrategy } from './logger-strategy';
export declare enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug"
}
export declare class ConsoleLogger implements LoggerStrategy {
    protected _logLevel: LogLevel;
    constructor(_logLevel?: LogLevel);
    protected _logLevelToInt: (logLevel: LogLevel) => number;
    protected _shouldLog: (currentLevel: LogLevel) => boolean;
    protected _consoleLog(msg: any, obj?: any): void;
    protected _logMessage: (type: LogLevel, msg: any, obj?: any) => void;
    debug(msg: any, obj?: any): void;
    info(msg: any, obj?: any): void;
    warn(msg: any, obj?: any): void;
    error(msg: any, obj?: any): void;
}
//# sourceMappingURL=console-logger.d.ts.map