import { Elysia } from 'elysia'
import { cron } from '../src'

const app = new Elysia()
    .state("A", "B")
    .use(
        cron({
            name: 'heartbeat',
            pattern: '*/30 * * * * *',
            run(cron) {
                console.log('Working')
            }
        })
    )
    .use(
        cron({
            name: 'logger',
            pattern: '*/1 * * * * *',
            run(cron) {
                console.log(new Date().toISOString())
            }
        })
    )
    .get(
        '/',
        ({
            store,
            store: {
                cron: { logger }
            }
        }) => {
            logger.stop()

            return 'Stop logger'
        }
    )
    .listen(3000)
