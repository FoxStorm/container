# FoxStorm Container

<p align="center">
  <b>Component of</b>
  <br />
  <img src="https://i.imgur.com/2EmQNvF.png" alt="FoxStorm Typescript WEB Framework" width="190" />
</p>

📦 Dependency injection / inversion of control framework.

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

To easily create *development*, *testing* and a *production* environments the following methods can be used:

```typescript
const development = Environment.development() // has isRelease false
const testing = Environment.testing() // has isRelease false
const production = Environment.production() // has isRelease true
```

## Config

Config chooses the proper service when multiple services has been registered for the same interface. Assuming this services are registered on the same interface:

```typescript
const services = new Services()

services.registerWithInterface(PrintLogger, 'Logger')
services.registerWithInterface(FileLogger, 'Logger')
```

we need to choose which service should be used:

```typescript
const config = new Config()

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
```

## Services

New services can be registered, configured or even created. There are a couple of ways how you can register a service:

```typescript
const services = new Services()

services.registerInterfaceWithFactory(PrintLogger, () => {
  return new PrintLogger()
})
services.registerInterfaceWithFactory(PrintLogger, 'Logger', () => {
  return new PrintLogger()
})
services.registerServiceWithInterfacesAndFactory(PrintLogger, [ 'Logger', 'ErrorLogger' ], () => {
  return new PrintLogger()
})

try  {
  services.registerProvider(new PrintLoggerProvider())
} catch { /* throw some error */ }
```

Services can be registered easier if they implement a static `makeService` method.

```typescript
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
const services = new Services()

services.registerInstance(new PrintLogger())
services.registerInstanceWithInterface(new PrintLogger(), 'Logger')
services.registerInstanceWithInterfaces(new PrintLogger(), [ 'Logger', 'ErrorLogger' ])
services.registerService(PrintLogger)
```

## ApplicationContainer

## Full Example

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

services.registerWithInterface(PrintLogger, 'Logger')
services.registerWithInterface(FileLogger, 'Logger')

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

const printLogger = application.retrieveServiceFor(PrintLogger)
const fileLogger = application.retrieveServiceFor(FileLogger)
const logger = application.retrieveServiceFor('Logger') // resolved by custom preference

logger.info(`I'm a logger`)
```