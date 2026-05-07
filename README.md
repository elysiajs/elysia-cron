# @elysia/cron
[Elysia](https://github.com/elysiajs/elysia) plugin to integrate cron jobs.

## Installation
```bash
bun add @elysia/cron
```

## Example
```typescript
import { Elysia } from 'elysia'
import { cron } from '@elysia/cron'

const app = new Elysia()
    use(
        cron({
            name: 'heartbeat',
            pattern: '*/1 * * * * *',
            run() {
                console.log("Heartbeat")
            }
        }
    )
    .get('/stop', ({ store: { cron: { heartbeat } } }) => {
        heartbeat.stop()

        return 'Stop heartbeat'
    })
    .listen(8080)
```

## API
This plugin export `cron` function using [croner](https://github.com/hexagon/croner)

For documentation, `cron` use the same syntax as [croner](https://github.com/hexagon/croner), so please refers to [croner documentation](https://github.com/hexagon/croner)
