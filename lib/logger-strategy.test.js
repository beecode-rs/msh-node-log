"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLoggerStrategy = void 0;
const mockLoggerStrategy = (sandbox) => class {
    constructor(...args) {
        this.stub_constructor = sandbox.stub();
        this.debug = sandbox.stub();
        this.error = sandbox.stub();
        this.info = sandbox.stub();
        this.warn = sandbox.stub();
        this.stub_constructor(...args);
    }
};
exports.mockLoggerStrategy = mockLoggerStrategy;
//# sourceMappingURL=logger-strategy.test.js.map