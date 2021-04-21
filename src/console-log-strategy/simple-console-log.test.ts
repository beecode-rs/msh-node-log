import { LogLevelType } from '../log-level-type'
import { SimpleConsoleLog } from './simple-console-log'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('logger - SimpleConsoleLog', () => {
  const sandbox = createSandbox()
  let stub_console_log: SinonStub
  const simpleConsoleLog = new SimpleConsoleLog()
  const mockDateTime = new Date()
  const mockDateTimeStr = mockDateTime.toISOString()

  beforeEach(() => {
    stub_console_log = sandbox.stub(console, 'log')
  })
  afterEach(sandbox.restore)

  describe('log', () => {
    it('should call console.log with string', () => {
      const msg = 'test'
      simpleConsoleLog.log({ type: LogLevelType.DEBUG, messageObject: msg, datetime: mockDateTime })
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, `${mockDateTimeStr} - DEBUG: ${msg}`)
    })

    it('should call console.log with object', () => {
      const obj = { test: 'test' }
      simpleConsoleLog.log({ type: LogLevelType.INFO, messageObject: obj, datetime: mockDateTime })
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, `${mockDateTimeStr} - INFO:`, obj)
    })

    it('should call console.log with two arguments', () => {
      const msg = 'test'
      const obj = { test: 'test' }
      simpleConsoleLog.log({ type: LogLevelType.ERROR, messageObject: msg, meta: obj, datetime: mockDateTime })
      assert.calledTwice(stub_console_log)
      assert.calledWith(stub_console_log.getCall(0), `${mockDateTimeStr} - ERROR: ${msg}`)
      assert.calledWith(stub_console_log.getCall(1), obj)
    })
  })
})
