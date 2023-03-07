# @elysiajs/cron
Plugin for [elysia](https://github.com/elysiajs/elysia) that add support for running cronjob.

## Installation
```bash
bun add @elysiajs/cron
```

## Example
```typescript
import { Elysia } from 'elysia'
import { cron } from '@elysiajs/cron'

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
This plugin export `cron` function using [cronner](https://github.com/hexagon/croner)

For documentation, `cron` use the same syntax as [cronner](https://github.com/hexagon/croner), so please refers to [cronner documentation](https://github.com/hexagon/croner)
