"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const simple_console_log_1 = require("./console-log-strategy/simple-console-log");
const log_level_type_1 = require("./log-level-type");
const type_util_1 = require("./util/type-util");
class ConsoleLogger {
    constructor({ logLevel = log_level_type_1.LogLevelType.ERROR, consoleLogStrategy = new simple_console_log_1.SimpleConsoleLog(), messagePrefix, meta, } = {}) {
        this._logLevel = logLevel;
        this._consoleLogStrategy = consoleLogStrategy;
        this._messagePrefix = messagePrefix;
        this._meta = meta;
    }
    clone(params = {}) {
        var _a, _b;
        return new ConsoleLogger({
            meta: (this._meta || params.meta) && Object.assign(Object.assign({}, this._meta), params.meta),
            messagePrefix: (_a = params.messagePrefix) !== null && _a !== void 0 ? _a : this._messagePrefix,
            logLevel: (_b = params.logLevel) !== null && _b !== void 0 ? _b : this._logLevel,
        });
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
    _logMessage(type, ...messageObjects) {
        if (!this._shouldLog(type))
            return;
        this._consoleLogStrategy.log({ type, meta: this._meta, prefix: this._messagePrefix }, ...messageObjects);
    }
    debug(...messageObjects) {
        this._logMessage(log_level_type_1.LogLevelType.DEBUG, ...messageObjects);
    }
    info(...messageObjects) {
        this._logMessage(log_level_type_1.LogLevelType.INFO, ...messageObjects);
    }
    warn(...messageObjects) {
        this._logMessage(log_level_type_1.LogLevelType.WARN, ...messageObjects);
    }
    error(...messageObjects) {
        this._logMessage(log_level_type_1.LogLevelType.ERROR, ...messageObjects);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=console-logger.js.map