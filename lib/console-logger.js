"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const simple_console_log_1 = require("./console-log-strategy/simple-console-log");
const log_level_type_1 = require("./log-level-type");
class ConsoleLogger {
    constructor({ logLevel = log_level_type_1.LogLevelType.ERROR, consoleLogStrategy = new simple_console_log_1.SimpleConsoleLog() } = {}) {
        this._logLevelToInt = (logLevel) => {
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
                    throw new Error(`Unknown log lever [${logLevel}]`);
            }
        };
        this._shouldLog = (currentLevel) => {
            return this._logLevelToInt(this._logLevel) >= this._logLevelToInt(currentLevel);
        };
        this._logMessage = (type, messageObject, meta) => {
            if (!this._shouldLog(type))
                return;
            this._consoleLogStrategy.log({ type, messageObject, meta });
        };
        if (typeof logLevel !== 'string')
            throw new Error("Only string value allowed for log level. Allowed values ['error' | 'warn' | 'info' | 'debug']");
        this._logLevel = log_level_type_1.LogLevelType[logLevel.toUpperCase()];
        if (!this._logLevel)
            throw new Error(`Unknown log level [${logLevel}]. Allowed values ['error' | 'warn' | 'info' | 'debug']`);
        this._consoleLogStrategy = consoleLogStrategy;
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