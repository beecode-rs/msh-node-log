"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeUtil = void 0;
exports.typeUtil = {
    exhaustiveCheck: (message, _) => {
        return new Error(`ExhaustiveCheck: ${message} [${_}]`);
    },
};
//# sourceMappingURL=type-util.js.map