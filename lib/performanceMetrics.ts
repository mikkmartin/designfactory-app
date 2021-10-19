import { ServerResponse } from 'http'
import { performance } from 'perf_hooks'

class Performance {
  timers: {
    [key: string]: { start: number; end?: number }
  } = {}
  startTimer = name => {
    this.timers[name] = { start: performance.now() }
  }
  endTimer = name => {
    this.timers[name] = { ...this.timers[name], end: performance.now() }
  }
  setHeader = (res: ServerResponse) => {
    const headerValue = Object.entries(this.timers).reduce((str, [k, v], i) => {
      if (i > 0) str += ', '
      str += `${i};dur=${v.end - v.start};desc="${k}"`
      return str
    }, '')
    this.timers = {}
    res.setHeader('Server-Timing', headerValue)
  }
}

export default new Performance()
