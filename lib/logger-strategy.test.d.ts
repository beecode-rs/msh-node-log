import { SinonSandbox, SinonStub } from 'sinon';
export interface MockLoggerStrategy {
    debug: SinonStub<any[], void>;
    error: SinonStub<any[], void>;
    info: SinonStub<any[], void>;
    warn: SinonStub<any[], void>;
}
export declare const mockLoggerStrategyFactory: (sandbox: SinonSandbox) => any;
//# sourceMappingURL=logger-strategy.test.d.ts.map