# FoxStorm Service

📦 Dependency injection / inversion of control framework.

## Example
```typescript
// printLogger.ts
class PrintLogger {
    static makeService (): this {
        return new this()
    }
    info (message: string) {
        console.log(message)
    }
}

// application.ts
import { Config, Environment, Services, ApplicationContainer } from 'foxstorm-container'

const environment = Environment.development()
const config = new Config()
const services = new Services()

services.register(PrintLogger)

const application = new ApplicationContainer(config, environment, services)

const logger = application.retrieveServiceFor(PrintLogger)
logger.info(`I'm a logger`)
```