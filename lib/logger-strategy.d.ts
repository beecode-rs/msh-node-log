import { LogLevelType } from './log-level-type';
export declare type ObjectType = {
    [key: string]: any;
};
export declare type StringOrObjectType = string | ObjectType;
export declare type LoggerStrategyParams = {
    logLevel?: LogLevelType;
    messagePrefix?: string;
    meta?: ObjectType;
};
export interface LoggerStrategy {
    debug(...messageObjects: StringOrObjectType[]): void;
    info(...messageObjects: StringOrObjectType[]): void;
    warn(...messageObjects: StringOrObjectType[]): void;
    error(...messageObjects: StringOrObjectType[]): void;
    clone(overrideParams?: LoggerStrategyParams): LoggerStrategy;
}
//# sourceMappingURL=logger-strategy.d.ts.map