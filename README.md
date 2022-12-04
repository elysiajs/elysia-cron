# @kingworldjs/cron
A plugin for [kingworld](https://github.com/elysiajs/elysia) that add support for running cronjob.

## Installation
```bash
bun add @kingworldjs/cron
```

## Example
```typescript
import { KingWorld } from 'kingworld'
import '@kingworldjs/cron'

const app = new KingWorld()
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
This plugin extends `cron` method to KingWorld using [cronner](https://github.com/hexagon/croner)

For documentation, `app.cron` use the same syntax as [cronner](https://github.com/hexagon/croner), so please refers to [cronner documentation](https://github.com/hexagon/croner)
