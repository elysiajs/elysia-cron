import type { ElysiaInstance } from 'elysia'
import type { Cron, CronOptions } from 'croner'

export interface CronConfig<Name extends string = string> extends CronOptions {
    /**
     * Input pattern, input date, or input ISO 8601 time string
     *
     * ---
     * ```plain
     * ┌────────────── second (optional)
     * │ ┌──────────── minute
     * │ │ ┌────────── hour
     * │ │ │ ┌──────── day of month
     * │ │ │ │ ┌────── month
     * │ │ │ │ │ ┌──── day of week
     * │ │ │ │ │ │
     * * * * * * *
     * ```
     */
    pattern: string
    /**
     * Cronjob name to registered to `store`
     */
    name: Name
}

export interface CronStore<Name extends string = string> {
    cron: Record<Name, Cron>
}

declare module 'elysia' {
    interface Elysia {
        cron<Name extends string = string>(
            options: Omit<CronConfig<Name>, 'run'>,
            run: (
                store: CronStore<Name> & this['store']
            ) => void | Promise<void>
        ): this extends Elysia<infer A>
            ? Elysia<
                  A & {
                      store: CronStore<Name>
                  }
              >
            : Elysia<
                  ElysiaInstance & {
                      store: CronStore<Name>
                  }
              >
    }
}
