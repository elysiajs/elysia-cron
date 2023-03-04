import { Elysia } from 'elysia'
import '../src'

import { describe, expect, it } from 'bun:test'

const req = (path: string) => new Request(path)

describe('Cron', () => {
    it('run cronjob', async () => {
        let done = false

        new Elysia().cron(
            {
                pattern: '*/1 * * * * *',
                name: 'job'
            },
            () => {
                done = true
            }
        )

        await new Promise((resolve) => setTimeout(resolve, 1100))

        expect(done).toBe(true)
    })

    it('add cron to store', async () => {
        const app = new Elysia().cron(
            {
                pattern: '*/1 * * * * *',
                name: 'job'
            },
            () => {}
        )

        expect(Object.keys(app.store.cron)[0]).toBe('job')
    })

    it('stop cronjob', async () => {
        let done = false

        const app = new Elysia()
            .cron(
                {
                    pattern: '*/1 * * * * *',
                    name: 'job'
                },
                () => {
                    done = true
                }
            )
            .get('/stop', ({ store }) => {
                store.cron.job.stop()

                return 'stop'
            })

        await app.handle(req('/stop'))

        expect(done).toBe(false)
    })
})
