import { LogLevelType } from '../log-level-type'
import { NewRelicJsonConsoleLog } from './new-relic-json-console-log'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('NewRelicConsoleLog', () => {
  const sandbox = createSandbox()
  let stub_console_log: SinonStub
  const newRelicJsonConsoleLog = new NewRelicJsonConsoleLog()
  const mockDateTime = new Date()
  const mockTimeStamp = mockDateTime.getTime()

  beforeEach(() => {
    stub_console_log = sandbox.stub(console, 'log')
  })
  afterEach(sandbox.restore)

  describe('log', () => {
    it('should call console.log with string', () => {
      const msg = 'test'
      newRelicJsonConsoleLog.log({ type: LogLevelType.ERROR, datetime: mockDateTime }, msg)
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, JSON.stringify({ logtype: 'error', timestamp: mockTimeStamp, message: msg }))
    })

    it('should call console.log with object', () => {
      const obj = { test: 'test' }
      newRelicJsonConsoleLog.log({ type: LogLevelType.INFO, datetime: mockDateTime }, obj)
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, JSON.stringify({ logtype: 'info', timestamp: mockTimeStamp, ...obj }))
    })

    it('should call console.log with message and meta', () => {
      const msg = 'test'
      const metaObj = { test: 'test' }
      newRelicJsonConsoleLog.log({ type: LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime }, msg)
      assert.calledOnce(stub_console_log)
      assert.calledWith(
        stub_console_log,
        JSON.stringify({ ...metaObj, logtype: 'debug', timestamp: mockTimeStamp, message: msg })
      )
    })

    it('should call console.log with string message and prefix', () => {
      const msg = 'test'
      const prefix = 'Prefix'
      const metaObj = { test: 'test' }
      newRelicJsonConsoleLog.log({ type: LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime, prefix }, msg)
      assert.calledOnce(stub_console_log)
      assert.calledWith(
        stub_console_log,
        JSON.stringify({ ...metaObj, logtype: 'debug', timestamp: mockTimeStamp, message: `${prefix} ${msg}` })
      )
    })

    it('should call console.log with object message and prefix {someMessage:string}', () => {
      const msg = { someMessage: 'test' }
      const prefix = 'Prefix'
      const metaObj = { test: 'test' }
      newRelicJsonConsoleLog.log({ type: LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime, prefix }, msg)
      assert.calledOnce(stub_console_log)
      assert.calledWith(
        stub_console_log,
        JSON.stringify({ ...metaObj, logtype: 'debug', timestamp: mockTimeStamp, ...msg, message: prefix })
      )
    })

    it('should call console.log with object message and prefix {message:string}', () => {
      const msg = { message: 'test' }
      const prefix = 'Prefix'
      const metaObj = { test: 'test' }
      newRelicJsonConsoleLog.log({ type: LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime, prefix }, msg)
      assert.calledOnce(stub_console_log)
      assert.calledWith(
        stub_console_log,
        JSON.stringify({ ...metaObj, logtype: 'debug', timestamp: mockTimeStamp, ...msg, message: `${prefix} ${msg.message}` })
      )
    })

    it('should call console.log with string message and prefix', () => {
      const msg = 'test'
      const prefix = 'Prefix'
      const metaObj = { test: 'test' }
      newRelicJsonConsoleLog.log({ type: LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime, prefix }, msg)
      assert.calledOnce(stub_console_log)
      assert.calledWith(
        stub_console_log,
        JSON.stringify({ ...metaObj, logtype: 'debug', timestamp: mockTimeStamp, message: `${prefix} ${msg}` })
      )
    })

    it('should call console.log with multi string message and meta', () => {
      const msg = 'test'
      const msg1 = 'test1'
      const msg2 = 'test2'
      const metaObj = { test: 'test' }
      newRelicJsonConsoleLog.log({ type: LogLevelType.DEBUG, meta: metaObj, datetime: mockDateTime }, msg, msg1, msg2)
      assert.calledThrice(stub_console_log)
      assert.calledWith(
        stub_console_log.getCall(0),
        JSON.stringify({ ...metaObj, logtype: 'debug', timestamp: mockTimeStamp, message: msg })
      )
      assert.calledWith(
        stub_console_log.getCall(1),
        JSON.stringify({ ...metaObj, logtype: 'debug', timestamp: mockTimeStamp, message: msg1 })
      )
      assert.calledWith(
        stub_console_log.getCall(2),
        JSON.stringify({ ...metaObj, logtype: 'debug', timestamp: mockTimeStamp, message: msg2 })
      )
    })
  })
})
