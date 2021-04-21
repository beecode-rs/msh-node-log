import { LoggerStrategy, ObjectType, StringOrObjectType } from './logger-strategy';
export declare class NoLogger implements LoggerStrategy {
    debug(_: StringOrObjectType, __?: ObjectType): void;
    error(_: StringOrObjectType, __?: ObjectType): void;
    info(_: StringOrObjectType, __?: ObjectType): void;
    warn(_: StringOrObjectType, __?: ObjectType): void;
}
//# sourceMappingURL=no-logger.d.ts.map