import { LogLevelType } from './log-level-type'
import { util } from './util'
import { expect } from 'chai'

describe('util', () => {
  ;([
    [LogLevelType.DEBUG, 'log'],
    [LogLevelType.INFO, 'info'],
    [LogLevelType.WARN, 'warn'],
    [LogLevelType.ERROR, 'error'],
  ] as [LogLevelType, string][]).forEach(([type, result]) => {
    it(`should return ${result} for log level type ${type}`, () => {
      expect(util.logTypeToFunction(type)).to.eq(result)
    })
  })

  it('should throw error if wront type passed', () => {
    try {
      util.logTypeToFunction('dummyType' as any)
      expect.fail()
    } catch (err) {
      expect(err.message).to.equal(`Unknown log level type [dummyType]`)
    }
  })
})
