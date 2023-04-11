import { typeUtil } from '@beecode/msh-util/lib/type-util'
import { LogLevel } from 'src/log-level'
import { ObjectType, StringOrObjectType } from 'src/logger-strategy'
import { ConsoleLogStrategy } from 'src/logger-strategy/console/log-strategy'

export class ConsoleLogStrategySimple implements ConsoleLogStrategy {
	log(params: { type: LogLevel; meta?: ObjectType; datetime?: Date; prefix?: string }, ...msgs: StringOrObjectType[]): void {
		const { type, meta, prefix, datetime = new Date() } = params
		const fnName = ConsoleLogStrategySimple.LogTypeToFunctionName(type)

		/* eslint-disable no-console*/
		msgs.forEach((msg, ix) => {
			if (ix === 0) {
				console[fnName](`${datetime.toISOString()} - ${type.toUpperCase()}: ${prefix ?? ''}`, msg)
			} else {
				console[fnName](msg)
			}
		})
		if (meta) {
			console[fnName](meta)
		}
		/* eslint-enable no-console*/
	}

	static LogTypeToFunctionName(type: LogLevel): 'log' | 'info' | 'warn' | 'error' {
		switch (type) {
			case LogLevel.ERROR:
				return 'error'
			case LogLevel.WARN:
				return 'warn'
			case LogLevel.INFO:
				return 'info'
			case LogLevel.DEBUG:
				return 'log'
			default:
				throw typeUtil.exhaustiveError(`Unknown log level type [${type}]`, type)
		}
	}
}
