"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLoggerStrategyFactory = void 0;
const mockLoggerStrategyFactory = (sandbox) => {
    var _a;
    const stub_constructor = sandbox.stub();
    return _a = class {
            constructor(...args) {
                this.debug = sandbox.stub();
                this.error = sandbox.stub();
                this.info = sandbox.stub();
                this.warn = sandbox.stub();
                stub_constructor(...args);
            }
        },
        _a.STUB_CONSTRUCTOR = stub_constructor,
        _a;
};
exports.mockLoggerStrategyFactory = mockLoggerStrategyFactory;
//# sourceMappingURL=logger-strategy.test.js.map