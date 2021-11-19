"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewRelicJsonConsoleLog = void 0;
class NewRelicJsonConsoleLog {
    log(params, ...msgs) {
        const { type, meta, prefix, datetime = new Date() } = params;
        msgs.forEach((msg) => {
            const payload = Object.assign(Object.assign(Object.assign({}, meta), { logtype: type.toString(), timestamp: datetime.getTime() }), (typeof msg === 'object'
                ? Object.assign(Object.assign({}, msg), ((prefix || msg.message) && { message: this._joinDefined(prefix, msg.message) })) : { message: this._joinDefined(prefix, msg) }));
            console.log(JSON.stringify(payload)); // eslint-disable-line no-console
        });
    }
    _joinDefined(prefix, msg) {
        return [prefix, msg].filter(Boolean).join(' ');
    }
}
exports.NewRelicJsonConsoleLog = NewRelicJsonConsoleLog;
//# sourceMappingURL=new-relic-json-console-log.js.map