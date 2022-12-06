import { type Cron } from 'croner'
import type { CronOptions } from 'croner/types/options'

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
