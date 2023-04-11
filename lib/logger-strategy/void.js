"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerStrategyVoid = void 0;
class LoggerStrategyVoid {
    debug(_, __) { } // eslint-disable-line
    error(_, __) { } // eslint-disable-line
    info(_, __) { } // eslint-disable-line
    warn(_, __) { } // eslint-disable-line
    // eslint-disable-next-line
    clone(_) {
        return new LoggerStrategyVoid();
    }
}
exports.LoggerStrategyVoid = LoggerStrategyVoid;
//# sourceMappingURL=void.js.map