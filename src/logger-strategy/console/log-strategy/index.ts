import { LogLevel } from 'src/log-level'
import { ObjectType, StringOrObjectType } from 'src/logger-strategy'

export interface ConsoleLogStrategy {
	log(
		params: { type: LogLevel; meta?: ObjectType; datetime?: Date; prefix?: string },
		...messageObjects: StringOrObjectType[]
	): void
}
