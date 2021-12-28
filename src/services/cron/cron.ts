import cron, { ScheduledTask } from "node-cron"

class CronScheduler {
  constructor(private callback: () => Promise<void>) {}

  execute(interval: string): ScheduledTask {
    const task = cron.schedule(
      interval,
      async () => {
        return await this.callback()
      },
      { scheduled: false }
    )

    return task
  }
}

export { CronScheduler }
