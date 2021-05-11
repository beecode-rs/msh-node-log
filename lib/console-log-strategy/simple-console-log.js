"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleConsoleLog = void 0;
const util_1 = require("../util");
class SimpleConsoleLog {
    log({ type, messageObject, meta, datetime = new Date(), }) {
        /* eslint-disable no-console*/
        const fnName = util_1.util.logTypeToFunction(type);
        if (typeof messageObject === 'object')
            console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}:`, messageObject);
        else
            console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}: ${messageObject}`);
        if (meta)
            console[fnName](meta);
        /* eslint-enable no-console*/
    }
}
exports.SimpleConsoleLog = SimpleConsoleLog;
//# sourceMappingURL=simple-console-log.js.map