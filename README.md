# FoxStorm Container

📦 Dependency injection / inversion of control framework.

<p align="center">
  *Component of*
  <br />
  <img src="https://i.imgur.com/2EmQNvF.png" alt="FoxStorm Typescript WEB Framework" width="190" />
</p>

FoxStorm Container is a lightweight Inversion of Control container for TypeScript applications. It uses a mechanism to register dependencies which can be retriever later as instance.

## API

* Environment
* Config
* Services
* ApplicationContainer

## Environment

`Environment` is used to create a environment instance by passing a string as the _name_ and a boolean as _isRelease_.

```typescript
const staging = Environment.new('staging', false)
```

To easy create *development*, *testing* and a *production* environments the following methods can be used:

```typescript
const development = Environment.development() // has isRelease false
const testing = Environment.testing() // has isRelease false
const production = Environment.production() // has isRelease true
```

## Config

## Services

## ApplicationContainer

## Example

```typescript
// Logger.ts
interface Logger {
    info (message: string): void
}
```

```typescript
// PrintLogger.ts
class PrintLogger implements Logger {
    static makeService (): this {
        return new this()
    }
    info (message: string): void {
        console.log(message)
    }
}
```

```typescript
// FileLogger.ts
import * as fs from 'fs'

class FileLogger implements Logger{
    static makeService (): this {
        return new this()
    }
    info (message: string): void {
        fs.writeFile('foo.txt', message)
    }
}
```

```typescript
// Application.ts
import { Config, Environment, Services, ApplicationContainer } from 'foxstorm-container'

const environment = Environment.development()
const config = new Config()
const services = new Services()

services.register(PrintLogger, 'Logger')
services.register(FileLogger, 'Logger')

switch (environment.name) {
    case 'development': {
        const preference: ConfigPreference = { prefer: PrintLogger, for: 'Logger' }
        config.usePreference(preference)
    },
    case 'production': {
        const preference: ConfigPreference = { prefer: FileLogger, for: 'Logger' }
        config.usePreference(preference)
    }
}
const application = new ApplicationContainer(config, environment, services)

const logger = application.retrieveServiceFor(PrintLogger)
logger.info(`I'm a logger`)
```