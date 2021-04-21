"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockConsoleLogStrategyFactory = void 0;
const mockConsoleLogStrategyFactory = (sandbox) => {
    return class {
        constructor() {
            this.log = sandbox.stub();
        }
    };
};
exports.mockConsoleLogStrategyFactory = mockConsoleLogStrategyFactory;
//# sourceMappingURL=console-log-strategy.test.js.map