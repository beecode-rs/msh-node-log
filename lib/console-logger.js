"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["DEBUG"] = "debug";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class ConsoleLogger {
    constructor(_logLevel = LogLevel.ERROR) {
        this._logLevel = _logLevel;
        this._logLevelToInt = (logLevel) => {
            switch (logLevel) {
                case LogLevel.ERROR:
                    return 0;
                case LogLevel.WARN:
                    return 1;
                case LogLevel.INFO:
                    return 2;
                case LogLevel.DEBUG:
                    return 3;
                default:
                    throw new Error(`Unknown log lever [${logLevel}]`);
            }
        };
        this._shouldLog = (currentLevel) => {
            return this._logLevelToInt(this._logLevel) >= this._logLevelToInt(currentLevel);
        };
        this._logMessage = (type, msg, obj) => {
            if (!this._shouldLog(type))
                return;
            if (typeof msg === 'string')
                this._consoleLog(`${type.toUpperCase()}: ${msg}`);
            else
                this._consoleLog(`${type.toUpperCase()}:`, msg);
            if (obj)
                this._consoleLog(obj);
        };
    }
    _consoleLog(msg, obj) {
        console.log(msg, obj); // eslint-disable-line no-console
    }
    debug(msg, obj) {
        this._logMessage(LogLevel.DEBUG, msg, obj);
    }
    info(msg, obj) {
        this._logMessage(LogLevel.INFO, msg, obj);
    }
    warn(msg, obj) {
        this._logMessage(LogLevel.WARN, msg, obj);
    }
    error(msg, obj) {
        this._logMessage(LogLevel.ERROR, msg, obj);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=console-logger.js.map