import { LogLevelType } from './log-level-type'

export const util = {
  logTypeToFunction: (type: LogLevelType): 'log' | 'info' | 'warn' | 'error' => {
    switch (type) {
      case LogLevelType.ERROR:
        return 'error'
      case LogLevelType.WARN:
        return 'warn'
      case LogLevelType.INFO:
        return 'info'
      case LogLevelType.DEBUG:
        return 'log'
      default:
        throw new Error(`Unknown log level type [${type}]`)
    }
  },
}
