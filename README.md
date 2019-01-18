# FoxStorm Service

📦 Dependency injection / inversion of control framework.

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