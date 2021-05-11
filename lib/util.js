"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = void 0;
const log_level_type_1 = require("./log-level-type");
exports.util = {
    logTypeToFunction: (type) => {
        switch (type) {
            case log_level_type_1.LogLevelType.ERROR:
                return 'error';
            case log_level_type_1.LogLevelType.WARN:
                return 'warn';
            case log_level_type_1.LogLevelType.INFO:
                return 'info';
            case log_level_type_1.LogLevelType.DEBUG:
                return 'log';
            default:
                throw new Error(`Unknown log level type [${type}]`);
        }
    },
};
//# sourceMappingURL=util.js.map