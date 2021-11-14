export declare type StringOrObjectType = string | {
    [key: string]: any;
};
export interface LoggerStrategy {
    debug(messageObject: StringOrObjectType, meta?: StringOrObjectType): void;
    info(messageObject: StringOrObjectType, meta?: StringOrObjectType): void;
    warn(messageObject: StringOrObjectType, meta?: StringOrObjectType): void;
    error(messageObject: StringOrObjectType, meta?: StringOrObjectType): void;
}
//# sourceMappingURL=logger-strategy.d.ts.map