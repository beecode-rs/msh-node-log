"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogStrategyNewRelicJson = void 0;
const object_util_1 = require("@beecode/msh-util/lib/object-util");
class ConsoleLogStrategyNewRelicJson {
    constructor() {
        this._objectUtil = new object_util_1.ObjectUtil();
    }
    log(params, ...msgs) {
        const { type, meta, prefix, datetime = new Date() } = params;
        const messagePayloads = msgs.map((msg) => {
            return Object.assign(Object.assign(Object.assign({}, meta), { logtype: type.toString(), timestamp: datetime.getTime() }), this._messagePayloadExtractorIfExists({ msg, prefix }));
        });
        messagePayloads.forEach((payload) => {
            console.log(this._objectUtil.deepStringify(payload, { isSorted: true })); // eslint-disable-line no-console
        });
    }
    _messagePayloadExtractorIfExists(params) {
        const { msg, prefix } = params;
        if (typeof msg === 'object') {
            return Object.assign(Object.assign({}, msg), ((prefix || msg.message) && { message: this._joinDefined(prefix, msg.message) }));
        }
        return { message: this._joinDefined(prefix, msg) };
    }
    _joinDefined(prefix, msg) {
        return [prefix, msg].filter(Boolean).join(' ');
    }
}
exports.ConsoleLogStrategyNewRelicJson = ConsoleLogStrategyNewRelicJson;
//# sourceMappingURL=new-relic-json.js.map