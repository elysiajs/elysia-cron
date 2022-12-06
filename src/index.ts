import { Elysia } from 'elysia'
import { Cron } from 'croner'

import type { CronConfig, CronStore } from './types'

Elysia.prototype.cron = function (
    { pattern, name, ...options } = {
        name: '' as any,
        pattern: ''
    },
    run: Function
) {
    if (!pattern) throw new Error('pattern is required')
    if (!name) throw new Error('name is required')

    return this.state('cron', {
        ...this.store.cron,
        [name]: new Cron(pattern, options, () => run(this.store))
    } as CronStore['cron'])
}

declare module 'elysia' {
    interface Elysia {
        cron<Name extends string = string, Instance extends this = this>(
            options: Omit<CronConfig<Name>, 'run'>,
            run: (
                store: CronStore<Name> & Instance['store']
            ) => void | Promise<void>
        ): Elysia<{
            request: {}
            store: CronStore<Name> & Instance['store']
            schema: {}
        }>
    }
}
