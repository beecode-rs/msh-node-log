"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.LogLevelType = void 0;
var LogLevelType;
(function (LogLevelType) {
    LogLevelType["ERROR"] = "error";
    LogLevelType["WARN"] = "warn";
    LogLevelType["INFO"] = "info";
    LogLevelType["DEBUG"] = "debug";
})(LogLevelType = exports.LogLevelType || (exports.LogLevelType = {}));
class ConsoleLogger {
    constructor(logLevel) {
        this._logLevelToInt = (logLevel) => {
            switch (logLevel) {
                case LogLevelType.ERROR:
                    return 0;
                case LogLevelType.WARN:
                    return 1;
                case LogLevelType.INFO:
                    return 2;
                case LogLevelType.DEBUG:
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
            if (typeof msg === 'string') {
                this._consoleLog(`${type.toUpperCase()}: ${msg}`);
            }
            else {
                this._consoleLog(`${type.toUpperCase()}:`, msg);
            }
            if (obj)
                this._consoleLog(obj);
        };
        if (typeof logLevel === 'string') {
            this._logLevel = LogLevelType[logLevel.toUpperCase()];
        }
        else {
            this._logLevel = logLevel !== null && logLevel !== void 0 ? logLevel : LogLevelType.ERROR;
        }
        if (!this._logLevel)
            throw new Error(`Unknown log level [${logLevel}]. Allowed values ['error' | 'warn' | 'info' | 'debug']`);
    }
    _consoleLog(msg, obj) {
        /* eslint-disable no-console*/
        if (obj)
            console.log(msg, obj);
        else
            console.log(msg);
        /* eslint-enable no-console*/
    }
    debug(msg, obj) {
        this._logMessage(LogLevelType.DEBUG, msg, obj);
    }
    info(msg, obj) {
        this._logMessage(LogLevelType.INFO, msg, obj);
    }
    warn(msg, obj) {
        this._logMessage(LogLevelType.WARN, msg, obj);
    }
    error(msg, obj) {
        this._logMessage(LogLevelType.ERROR, msg, obj);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=console-logger.js.map