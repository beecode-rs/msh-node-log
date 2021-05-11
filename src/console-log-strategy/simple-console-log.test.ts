import { LogLevelType } from '../log-level-type'
import { SimpleConsoleLog } from './simple-console-log'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('logger - SimpleConsoleLog', () => {
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
      simpleConsoleLog.log({ type: LogLevelType.DEBUG, messageObject: msg, datetime: mockDateTime })
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, `${mockDateTimeStr} - DEBUG: ${msg}`)
    })

    it('should call console.warn with string', () => {
      const msg = 'test'
      simpleConsoleLog.log({ type: LogLevelType.WARN, messageObject: msg, datetime: mockDateTime })
      assert.calledOnce(stub_console_warn)
      assert.calledWith(stub_console_warn, `${mockDateTimeStr} - WARN: ${msg}`)
    })

    it('should call console.log with object', () => {
      const obj = { test: 'test' }
      simpleConsoleLog.log({ type: LogLevelType.INFO, messageObject: obj, datetime: mockDateTime })
      assert.calledOnce(stub_console_info)
      assert.calledWith(stub_console_info, `${mockDateTimeStr} - INFO:`, obj)
    })

    it('should call console.log with two arguments', () => {
      const msg = 'test'
      const obj = { test: 'test' }
      simpleConsoleLog.log({ type: LogLevelType.ERROR, messageObject: msg, meta: obj, datetime: mockDateTime })
      assert.calledTwice(stub_console_error)
      assert.calledWith(stub_console_error.getCall(0), `${mockDateTimeStr} - ERROR: ${msg}`)
      assert.calledWith(stub_console_error.getCall(1), obj)
    })
  })
})
