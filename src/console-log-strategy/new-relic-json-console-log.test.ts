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
      newRelicJsonConsoleLog.log({ type: LogLevelType.ERROR, messageObject: msg, datetime: mockDateTime })
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, JSON.stringify({ logtype: 'error', timestamp: mockTimeStamp, message: msg }))
    })

    it('should call console.log with object', () => {
      const obj = { test: 'test' }
      newRelicJsonConsoleLog.log({ type: LogLevelType.INFO, messageObject: obj, datetime: mockDateTime })
      assert.calledOnce(stub_console_log)
      assert.calledWith(stub_console_log, JSON.stringify({ ...obj, logtype: 'info', timestamp: mockTimeStamp }))
    })

    it('should call console.log with two arguments (meta:object)', () => {
      const msg = 'test'
      const metaObj = { test: 'test' }
      newRelicJsonConsoleLog.log({ type: LogLevelType.DEBUG, messageObject: msg, meta: metaObj, datetime: mockDateTime })
      assert.calledOnce(stub_console_log)
      assert.calledWith(
        stub_console_log,
        JSON.stringify({ ...metaObj, logtype: 'debug', timestamp: mockTimeStamp, message: msg })
      )
    })

    it('should call console.log with two arguments (meta:string)', () => {
      const msg = 'test'
      const metaString = 'meta test'
      newRelicJsonConsoleLog.log({ type: LogLevelType.DEBUG, messageObject: msg, meta: metaString, datetime: mockDateTime })
      assert.calledOnce(stub_console_log)
      assert.calledWith(
        stub_console_log,
        JSON.stringify({ meta: metaString, logtype: 'debug', timestamp: mockTimeStamp, message: msg })
      )
    })
  })
})
