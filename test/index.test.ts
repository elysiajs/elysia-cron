/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Elysia } from 'elysia'
import { cron } from '../src'
import { Patterns } from '../src/schedule'

import { describe, expect, it } from 'bun:test'

const req = (path: string) => new Request(`http://localhost${path}`)

describe('Cron', () => {
    it('run cronjob', async () => {
        let done = false

        new Elysia().use(
            cron({
                pattern: '*/1 * * * * *',
                name: 'job',
                run() {
                    done = true
                }
            })
        )

        await new Promise((resolve) => setTimeout(resolve, 1100))

        expect(done).toBe(true)
    })

    it('add cron to store', async () => {
        const app = new Elysia().use(
            cron({
                pattern: '*/1 * * * * *',
                name: 'job',
                run() {
                    // Not empty
                }
            })
        )

        // @ts-expect-error
        expect(Object.keys(app.singleton.store.cron)[0]).toBe('job')
    })

    it('stop cronjob', async () => {
        let done = false

        const app = new Elysia()
            .use(
                cron({
                    pattern: '*/1 * * * * *',
                    name: 'job',
                    run() {
                        done = true
                    }
                })
            )
            .get('/stop', ({ store }) => {
                store.cron.job.stop()

                return 'stop'
            })

        await app.handle(req('/stop'))

        expect(done).toBe(false)
    })
})

describe('Mutli Cron', () => {
    it('run cronjobs', async () => {
        let done1 = false
        let done2 = false
        let done3 = false
        let done4 = false

         new Elysia().use(
            cron({
                pattern: '*/1 * * * * *',
                name: 'job1',
                run() {
                    done1 = true
                }
            })
        ).use(
            cron({
                pattern: '*/1 * * * * *',
                name: 'job2',
                run() {
                    done2 = true
                }
            })
        )
        .use(
            cron({
                pattern: Patterns.everySecond(),
                name: 'job3',
                run() {
                    done3 = true
                }
            })
        )
        .use(
            cron({
                pattern: Patterns.everySeconds(1),
                name: 'job4',
                run() {
                    done4 = true
                }
            })
        )

        await new Promise((resolve) => setTimeout(resolve, 1100))

        expect(done1).toBe(true)
        expect(done2).toBe(true)
        expect(done3).toBe(true)
        expect(done4).toBe(true)
    })

    it('add cronjobs to store', async () => {
        const app = new Elysia()
            .use(
                cron({
                    pattern: '*/1 * * * * *',
                    name: 'job1',
                    run() {
                        // Not empty
                    }
                })
            ).use(
                cron({
                    pattern: '*/1 * * * * *',
                    name: 'job2',
                    run() {
                        // Not empty
                    }
                })
            ).use(
                cron({
                    pattern: Patterns.EVERY_SECOND,
                    name: 'job3',
                    run() {
                        // Not empty
                    }
                })
            )

        // @ts-expect-error
        expect(Object.keys(app.store.cron)[0]).toBe('job1')
        // @ts-expect-error
        expect(Object.keys(app.store.cron)[1]).toBe('job2')
        // @ts-expect-error
        expect(Object.keys(app.store.cron)[2]).toBe('job3')
    })

    it('stop cronjobs', async () => {
        let done1 = false
        let done2 = false

        const app = new Elysia()
            .use(
                cron({
                    pattern: '*/1 * * * * *',
                    name: 'job1',
                    run() {
                        done1 = true
                    }
                })
            )
            .use(
                cron({
                    pattern: '*/1 * * * * *',
                    name: 'job2',
                    run() {
                        done2 = true
                    }
                })
            )
            .get('/stop', ({ store }) => {
                store.cron.job1.stop()
                store.cron.job2.stop()

                return 'stop'
            })

        await app.handle(req('/stop'))

        expect(done1).toBe(false)
        expect(done2).toBe(false)
    })
})
