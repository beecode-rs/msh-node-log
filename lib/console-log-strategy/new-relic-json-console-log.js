"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewRelicJsonConsoleLog = void 0;
class NewRelicJsonConsoleLog {
    log({ type, messageObject, meta, datetime = new Date(), }) {
        let payload = {
            logtype: type.toString(),
            timestamp: datetime.getTime(),
        };
        if (typeof messageObject === 'object')
            payload = Object.assign(Object.assign({}, messageObject), payload);
        else
            payload.message = messageObject;
        if (meta)
            payload = Object.assign(Object.assign({}, meta), payload);
        console.log(JSON.stringify(payload)); // eslint-disable-line no-console
    }
}
exports.NewRelicJsonConsoleLog = NewRelicJsonConsoleLog;
//# sourceMappingURL=new-relic-json-console-log.js.map