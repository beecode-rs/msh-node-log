import { ObjectUtil } from '@beecode/msh-util/lib/object-util';
import { LogLevel } from '../../../log-level';
import { ObjectType, StringOrObjectType } from '../../../logger-strategy';
import { ConsoleLogStrategy } from '../../../logger-strategy/console/log-strategy';
export declare class ConsoleLogStrategyNewRelicJson implements ConsoleLogStrategy {
    protected _objectUtil: ObjectUtil;
    log(params: {
        type: LogLevel;
        meta?: ObjectType;
        datetime?: Date;
        prefix?: string;
    }, ...msgs: StringOrObjectType[]): void;
    protected _messagePayloadExtractorIfExists(params: {
        msg: StringOrObjectType;
        prefix?: string;
    }): {
        message: string;
    };
    protected _joinDefined(prefix?: string, msg?: string): string;
}
//# sourceMappingURL=new-relic-json.d.ts.map