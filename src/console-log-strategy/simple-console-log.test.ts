import { LogLevelType } from '../log-level-type'
import { SimpleConsoleLog } from './simple-console-log'
import { expect } from 'chai'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('SimpleConsoleLog', () => {
  const sandbox = createSandbox()
  let stub_console_log: SinonStub
  let stub_console_info: SinonStub
  let stub_console_warn: SinonStub
  let stub_console_error: SinonStub
  const simpleConsoleLog = new SimpleConsoleLog()
  const mockDateTime = new Date()
  const mockDateTimeStr = mockDateTime.toISOString()

  beforeEach(() => {
    stub_console_log = sandbox.stub(console, 'log')
    stub_console_info = sandbox.stub(console, 'info')
    stub_console_warn = sandbox.stub(console, 'warn')
    stub_console_error = sandbox.stub(console, 'error')
  })
  afterEach(sandbox.restore)

  describe('log', () => {
    it('should call console.log with string', () => {
      const msg = 'test'
      simpleConsoleLog.log({ type: LogLevelType.DEBUG, datetime: mockDateTime }, msg)
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, `${mockDateTimeStr} - DEBUG: `, msg)
    })

    it('should call console.warn with string', () => {
      const msg = 'test'
      simpleConsoleLog.log({ type: LogLevelType.WARN, datetime: mockDateTime }, msg)
      assert.calledOnce(stub_console_warn)
      assert.calledWith(stub_console_warn, `${mockDateTimeStr} - WARN: `, msg)
    })

    it('should call console.warn with string and prefix', () => {
      const msg = 'test'
      const prefix = 'Prefix'
      simpleConsoleLog.log({ type: LogLevelType.WARN, datetime: mockDateTime, prefix }, msg)
      assert.calledOnce(stub_console_warn)
      assert.calledWith(stub_console_warn, `${mockDateTimeStr} - WARN: ${prefix}`, msg)
    })

    it('should call console.warn with multiple string, prefix and meta', () => {
      const msg = 'test'
      const msg1 = 'test1'
      const prefix = 'Prefix'
      const meta = { m: 'test' }
      simpleConsoleLog.log({ type: LogLevelType.WARN, datetime: mockDateTime, prefix, meta }, msg, msg1)
      assert.calledThrice(stub_console_warn)
      assert.calledWith(stub_console_warn.getCall(0), `${mockDateTimeStr} - WARN: ${prefix}`, msg)
      assert.calledWith(stub_console_warn.getCall(1), msg1)
      assert.calledWith(stub_console_warn.getCall(2), meta)
    })

    it('should call console.warn with multiple string', () => {
      const msg = 'test'
      const msg1 = 'test1'
      const msg2 = 'test2'
      simpleConsoleLog.log({ type: LogLevelType.WARN, datetime: mockDateTime }, msg, msg1, msg2)
      assert.calledThrice(stub_console_warn)

      assert.calledWith(stub_console_warn.getCall(0), `${mockDateTimeStr} - WARN: `, msg)
      assert.calledWith(stub_console_warn.getCall(1), msg1)
      assert.calledWith(stub_console_warn.getCall(2), msg2)
    })

    it('should call console.log with object', () => {
      const obj = { test: 'test' }
      simpleConsoleLog.log({ type: LogLevelType.INFO, datetime: mockDateTime }, obj)
      assert.calledOnce(stub_console_info)
      assert.calledWith(stub_console_info, `${mockDateTimeStr} - INFO: `, obj)
    })

    it('should call console.log with two arguments (meta:object)', () => {
      const msg = 'test'
      const metaObj = { test: 'test' }
      simpleConsoleLog.log({ type: LogLevelType.ERROR, meta: metaObj, datetime: mockDateTime }, msg)
      assert.calledTwice(stub_console_error)
      assert.calledWith(stub_console_error.getCall(0), `${mockDateTimeStr} - ERROR: `, msg)
      assert.calledWith(stub_console_error.getCall(1), metaObj)
    })

    it('should call console.log with multiple messages and meta', () => {
      const msg = 'test'
      const msg1 = 'test1'
      const metaObj = { test: 'test' }
      simpleConsoleLog.log({ type: LogLevelType.ERROR, meta: metaObj, datetime: mockDateTime }, msg, msg1)
      assert.calledThrice(stub_console_error)
      assert.calledWith(stub_console_error.getCall(0), `${mockDateTimeStr} - ERROR: `, msg)
      assert.calledWith(stub_console_error.getCall(1), msg1)
      assert.calledWith(stub_console_error.getCall(2), metaObj)
    })
  })

  describe('LogTypeToFunction', () => {
    ;(
      [
        [LogLevelType.DEBUG, 'log'],
        [LogLevelType.INFO, 'info'],
        [LogLevelType.WARN, 'warn'],
        [LogLevelType.ERROR, 'error'],
      ] as [LogLevelType, string][]
    ).forEach(([type, result]) => {
      it(`should return ${result} for log level type ${type}`, () => {
        expect(SimpleConsoleLog.LogTypeToFunction(type)).to.eq(result)
      })
    })

    it('should throw error if wrong type passed', () => {
      try {
        SimpleConsoleLog.LogTypeToFunction('dummyType' as any)
        expect.fail()
      } catch (err) {
        if (!(err instanceof Error)) throw err
        expect(err.message).to.equal(`ExhaustiveCheck: Unknown log level type [dummyType]`)
      }
    })
  })
})
