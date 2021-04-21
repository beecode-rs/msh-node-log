"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleConsoleLog = void 0;
class SimpleConsoleLog {
    log({ type, messageObject, meta, datetime = new Date(), }) {
        /* eslint-disable no-console*/
        if (typeof messageObject === 'object')
            console.log(`${datetime.toISOString()} - ${type.toUpperCase()}:`, messageObject);
        else
            console.log(`${datetime.toISOString()} - ${type.toUpperCase()}: ${messageObject}`);
        if (meta)
            console.log(meta);
        /* eslint-enable no-console*/
    }
}
exports.SimpleConsoleLog = SimpleConsoleLog;
//# sourceMappingURL=simple-console-log.js.map