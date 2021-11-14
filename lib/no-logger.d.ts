import { LoggerStrategy, StringOrObjectType } from './logger-strategy';
export declare class NoLogger implements LoggerStrategy {
    debug(_: StringOrObjectType, __?: StringOrObjectType): void;
    error(_: StringOrObjectType, __?: StringOrObjectType): void;
    info(_: StringOrObjectType, __?: StringOrObjectType): void;
    warn(_: StringOrObjectType, __?: StringOrObjectType): void;
}
//# sourceMappingURL=no-logger.d.ts.map