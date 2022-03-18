/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/18 11:19:39 (GMT+0900)
 *
 * LazyMan('Audrey')
 * * Hi, I'm Audrey
 *
 * LazyMan('Audrey').sleep(5).eat('lunch')
 * * Hi, I'm Audrey. (waited 5 seconds) I just fell asleep for 5 seconds. eat lunch.
 *
 * LazyMan('Audrey').eat('lunch').eat('supper')
 * * Hi, I'm Audrey. eat lunch. eat supper.
 *
 * LazyMan('Audrey').eat('lunch').sleepFirst(5)
 * * Hi, I'm Audrey. (waited 5 seconds) I just fell asleep for 5 seconds. eat lunch.
 */

const SLEEP_FIRST = 'sleepFirst'

class LazyManClass {
  private readonly tasks: {name: string; task: () => void}[];
  private readonly taskLogs: string[];
  private _callback: null | ((logs: string[]) => void);

  constructor(name: string) {
    this.tasks = []
    this.taskLogs = []

    // finally callback
    this._callback = null

    const taskFn = () => {
      this.taskLogs.push(`Hi, I'm ${name}.`)
      this._next()
    }

    this.tasks.push({
      name: 'init',
      task: taskFn
    })

    // Execute tasks asynchronously
    setTimeout(() => {
      this._next()
    }, 0)
  }

  public eat(foodName: string): this {
    const taskFn = () => {
      this.taskLogs.push(`eat ${foodName}.`)
      this._next()
    }
    this.tasks.push({
      name: 'eat',
      task: taskFn
    })
    return this
  }

  public sleep(seconds: number, isFirst = false): this {
    const taskFn = () => {
      this.taskLogs.push(`wait ${seconds} seconds.`)
      setTimeout(() => {
        this.taskLogs.push(`I just fell asleep for ${seconds} seconds.`)
        this._next()
      }, seconds * 1000)
    }

    if (isFirst) {
      // Find the index of the last sleepFirst task
      let lastIndex = -1
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].name !== SLEEP_FIRST) break
        lastIndex = i
      }
      // sleepFirst task takes precedence
      this.tasks.splice(lastIndex + 1, 0, {
        name: SLEEP_FIRST,
        task: taskFn
      })
    } else {
      this.tasks.push({
        name: 'sleep',
        task: taskFn
      })
    }

    return this
  }

  public sleepFirst(seconds: number): this {
    return this.sleep(seconds, true)
  }

  private _next(): void {
    const task = this.tasks.shift()
    if (task) {
      task.task()
    } else {
      this._callback && this._callback(this.taskLogs);
    }
  }

  public finally<T extends void>(callback: (logs: string[]) => T): void {
    this._callback = callback
  }
}

export {
  LazyManClass
}
