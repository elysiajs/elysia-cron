import { Elysia } from 'elysia'
import '../src'

const app = new Elysia()
    .cron(
        {
            name: 'heartbeat',
            pattern: '*/30 * * * * *'
        },
        () => {
            console.log('Working')
        }
    )
    .cron(
        {
            name: 'logger',
            pattern: '*/1 * * * * *'
        },
        () => {
            console.log(new Date().toISOString())
        }
    )
    .get(
        '/',
        ({
            store: {
                cron: { logger }
            }
        }) => {
            logger.stop()

            return 'Stop logger'
        }
    )
    .listen(3000)
