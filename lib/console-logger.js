"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const simple_console_log_1 = require("./console-log-strategy/simple-console-log");
const log_level_type_1 = require("./log-level-type");
const type_util_1 = require("./util/type-util");
class ConsoleLogger {
    constructor(params = {}) {
        const { logLevel = log_level_type_1.LogLevelType.ERROR, consoleLogStrategy = new simple_console_log_1.SimpleConsoleLog() } = params;
        this._logLevel = logLevel;
        this._consoleLogStrategy = consoleLogStrategy;
    }
    static LogLevelToInt(logLevel) {
        switch (logLevel) {
            case log_level_type_1.LogLevelType.ERROR:
                return 0;
            case log_level_type_1.LogLevelType.WARN:
                return 1;
            case log_level_type_1.LogLevelType.INFO:
                return 2;
            case log_level_type_1.LogLevelType.DEBUG:
                return 3;
            default:
                throw type_util_1.typeUtil.exhaustiveCheck(`Unknown log lever`, logLevel);
        }
    }
    _shouldLog(currentLevel) {
        return ConsoleLogger.LogLevelToInt(this._logLevel) >= ConsoleLogger.LogLevelToInt(currentLevel);
    }
    _logMessage(type, messageObject, meta) {
        if (!this._shouldLog(type))
            return;
        this._consoleLogStrategy.log({ type, messageObject, meta });
    }
    debug(messageObject, meta) {
        this._logMessage(log_level_type_1.LogLevelType.DEBUG, messageObject, meta);
    }
    info(messageObject, meta) {
        this._logMessage(log_level_type_1.LogLevelType.INFO, messageObject, meta);
    }
    warn(messageObject, meta) {
        this._logMessage(log_level_type_1.LogLevelType.WARN, messageObject, meta);
    }
    error(messageObject, meta) {
        this._logMessage(log_level_type_1.LogLevelType.ERROR, messageObject, meta);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=console-logger.js.map