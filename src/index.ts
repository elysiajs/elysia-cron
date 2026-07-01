import { Elysia } from 'elysia'
import { Cron, type CronOptions } from 'croner'

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
	/**
	 * Function to execute on time
	 */
	run: (store: Cron) => any | Promise<any>
}

export const cron =
	<Name extends string = string>({
		pattern,
		name,
		run,
		...options
	}: CronConfig<Name>) =>
	(app: Elysia) => {
		if (!pattern) throw new Error('pattern is required')
		if (!name) throw new Error('name is required')

		return app.state((store) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const cron: Record<Name, Cron> = store?.cron ?? Object.create(null)
			cron[name] = new Cron(pattern, options, () => run(store as any))

			return {
				...store,
				cron
			}
		})
	}

export { Patterns } from './schedule'

export default cron
