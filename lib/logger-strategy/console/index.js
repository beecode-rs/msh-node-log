"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerStrategyConsole = void 0;
const type_util_1 = require("@beecode/msh-util/lib/type-util");
const log_level_1 = require("../../log-level");
const simple_1 = require("../../logger-strategy/console/log-strategy/simple");
class LoggerStrategyConsole {
    constructor(params) {
        const { logLevel = log_level_1.LogLevel.ERROR, consoleLogStrategy = new simple_1.ConsoleLogStrategySimple(), messagePrefix, meta } = params !== null && params !== void 0 ? params : {};
        this._logLevel = logLevel;
        this._consoleLogStrategy = consoleLogStrategy;
        this._messagePrefix = messagePrefix;
        this._meta = meta;
    }
    clone(params) {
        const { meta, messagePrefix, logLevel } = params !== null && params !== void 0 ? params : {};
        return new LoggerStrategyConsole({
            logLevel: logLevel !== null && logLevel !== void 0 ? logLevel : this._logLevel,
            messagePrefix: messagePrefix !== null && messagePrefix !== void 0 ? messagePrefix : this._messagePrefix,
            meta: (this._meta || meta) && Object.assign(Object.assign({}, this._meta), meta),
        });
    }
    static LogLevelToInt(logLevel) {
        switch (logLevel) {
            case log_level_1.LogLevel.ERROR:
                return 0;
            case log_level_1.LogLevel.WARN:
                return 1;
            case log_level_1.LogLevel.INFO:
                return 2;
            case log_level_1.LogLevel.DEBUG:
                return 3;
            default:
                throw type_util_1.typeUtil.exhaustiveError(`Unknown log lever [${logLevel}]`, logLevel);
        }
    }
    _shouldLog(currentLevel) {
        return LoggerStrategyConsole.LogLevelToInt(this._logLevel) >= LoggerStrategyConsole.LogLevelToInt(currentLevel);
    }
    _logMessage(type, ...messageObjects) {
        if (!this._shouldLog(type)) {
            return;
        }
        this._consoleLogStrategy.log({ meta: this._meta, prefix: this._messagePrefix, type }, ...messageObjects);
    }
    debug(...messageObjects) {
        this._logMessage(log_level_1.LogLevel.DEBUG, ...messageObjects);
    }
    info(...messageObjects) {
        this._logMessage(log_level_1.LogLevel.INFO, ...messageObjects);
    }
    warn(...messageObjects) {
        this._logMessage(log_level_1.LogLevel.WARN, ...messageObjects);
    }
    error(...messageObjects) {
        this._logMessage(log_level_1.LogLevel.ERROR, ...messageObjects);
    }
}
exports.LoggerStrategyConsole = LoggerStrategyConsole;
//# sourceMappingURL=index.js.map