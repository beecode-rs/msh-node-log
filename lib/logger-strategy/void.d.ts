import { LoggerStrategy, LoggerStrategyParams, StringOrObjectType } from '../logger-strategy';
export declare class LoggerStrategyVoid implements LoggerStrategy {
    debug(_: StringOrObjectType, __?: StringOrObjectType): void;
    error(_: StringOrObjectType, __?: StringOrObjectType): void;
    info(_: StringOrObjectType, __?: StringOrObjectType): void;
    warn(_: StringOrObjectType, __?: StringOrObjectType): void;
    clone(_?: LoggerStrategyParams): LoggerStrategyVoid;
}
//# sourceMappingURL=void.d.ts.map