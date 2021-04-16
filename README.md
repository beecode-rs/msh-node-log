[![Build Status](https://beecode.semaphoreci.com/badges/msh-node-log/branches/main.svg?style=shields)](https://beecode.semaphoreci.com/projects/msh-node-log)
[![codecov](https://codecov.io/gh/beecode-rs/msh-node-log/branch/main/graph/badge.svg?token=KDT5MPESF4)](https://codecov.io/gh/beecode-rs/msh-node-log)
[![GitHub license](https://img.shields.io/github/license/beecode-rs/msh-node-log)](https://github.com/beecode-rs/msh-node-log/blob/main/LICENSE)  
[![NPM](https://nodei.co/npm/@beecode/msh-node-log.png)](https://nodei.co/npm/@beecode/msh-node-log)

# msh-node-log

Micro-service helper: node environment

This project is intended to be used in typescript project to help with logging needs.

<!-- toc -->

- [Install](#install)
- [Logger Strategy](#logger-strategy)
  - [NoLogger](#nologger)
  - [ConsoleLogger](#consolelogger)

<!-- tocstop -->

## Install

`npm i @beecode/msh-node-log`

## Logger Strategy

Define how and if we are logging.

### NoLogger

This is the default logging strategy, meaning the logging is ignored.

### ConsoleLogger

This is a simple logging strategy, it outputs all logs to console with a prefix of the log level (`ERROR:`, `WARN:`, `INFO:`
, `DEBUG:`).

```typescript
import MshNodeEnv, { logger } from '@beecode/msh-node-env'

const env = MshNodeEnv({ loggerStrategy: new logger.ConsoleLogger(logger.LogLevel.INFO) })
```

