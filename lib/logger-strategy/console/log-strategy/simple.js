"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogStrategySimple = void 0;
const type_util_1 = require("@beecode/msh-util/lib/type-util");
const log_level_1 = require("../../../log-level");
class ConsoleLogStrategySimple {
    log(params, ...msgs) {
        const { type, meta, prefix, datetime = new Date() } = params;
        const fnName = ConsoleLogStrategySimple.LogTypeToFunctionName(type);
        /* eslint-disable no-console*/
        msgs.forEach((msg, ix) => {
            if (ix === 0) {
                console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}: ${prefix !== null && prefix !== void 0 ? prefix : ''}`, msg);
            }
            else {
                console[fnName](msg);
            }
        });
        if (meta) {
            console[fnName](meta);
        }
        /* eslint-enable no-console*/
    }
    static LogTypeToFunctionName(type) {
        switch (type) {
            case log_level_1.LogLevel.ERROR:
                return 'error';
            case log_level_1.LogLevel.WARN:
                return 'warn';
            case log_level_1.LogLevel.INFO:
                return 'info';
            case log_level_1.LogLevel.DEBUG:
                return 'log';
            default:
                throw type_util_1.typeUtil.exhaustiveError(`Unknown log level type [${type}]`, type);
        }
    }
}
exports.ConsoleLogStrategySimple = ConsoleLogStrategySimple;
//# sourceMappingURL=simple.js.map