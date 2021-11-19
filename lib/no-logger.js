"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoLogger = void 0;
class NoLogger {
    debug(_, __) { } // eslint-disable-line
    error(_, __) { } // eslint-disable-line
    info(_, __) { } // eslint-disable-line
    warn(_, __) { } // eslint-disable-line
    // eslint-disable-next-line
    clone(_) {
        return new NoLogger();
    }
}
exports.NoLogger = NoLogger;
//# sourceMappingURL=no-logger.js.map