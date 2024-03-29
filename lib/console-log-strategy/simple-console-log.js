"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleConsoleLog = void 0;
const log_level_type_1 = require("../log-level-type");
const type_util_1 = require("../util/type-util");
class SimpleConsoleLog {
    log(params, ...msgs) {
        const { type, meta, prefix, datetime = new Date() } = params;
        const fnName = SimpleConsoleLog.LogTypeToFunction(type);
        /* eslint-disable no-console*/
        msgs.forEach((msg, ix) => {
            if (ix === 0) {
                console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}: ${prefix !== null && prefix !== void 0 ? prefix : ''}`, msg);
            }
            else {
                console[fnName](msg);
            }
        });
        if (meta)
            console[fnName](meta);
        /* eslint-enable no-console*/
    }
    static LogTypeToFunction(type) {
        switch (type) {
            case log_level_type_1.LogLevelType.ERROR:
                return 'error';
            case log_level_type_1.LogLevelType.WARN:
                return 'warn';
            case log_level_type_1.LogLevelType.INFO:
                return 'info';
            case log_level_type_1.LogLevelType.DEBUG:
                return 'log';
            default:
                throw type_util_1.typeUtil.exhaustiveCheck('Unknown log level type', type);
        }
    }
}
exports.SimpleConsoleLog = SimpleConsoleLog;
//# sourceMappingURL=simple-console-log.js.map