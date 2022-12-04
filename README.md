# @elysiajs/cron
Plugin for [elysia](https://github.com/elysiajs/elysia) that add support for running cronjob.

## Installation
```bash
bun add @elysiajs/cron
```

## Example
```typescript
import { Elysia } from 'elysia'
import '@elysiajs/cron'

const app = new Elysia()
    .cron({
        name: 'heartbeat',
        pattern: '*/1 * * * * *'
    }, () => {
        console.log("Heartbeat")
    })
    .get('/stop', ({ store: { cron: { heartbeat } } }) => {
        heartbeat.stop()

        return 'Stop heartbeat'
    })
    .listen(8080)
```

## API
This plugin extends `cron` method to Elysia using [cronner](https://github.com/hexagon/croner)

For documentation, `app.cron` use the same syntax as [cronner](https://github.com/hexagon/croner), so please refers to [cronner documentation](https://github.com/hexagon/croner)
