const { readFileSync, exists, existsSync, writeFileSync } = require('fs')

const { debug, warn } = console
const { isArray } = Array
const { now } = Date

const isExist = v => v !== null && v !== undefined
const isNumber = v => typeof v === 'number'
const isString = v => typeof v === 'string'
const isObject = v => typeof v === 'object' && v !== null && !Array.isArray(v)
const isLength = v => (isArray(v) || isString(v)) && v.length > 0
const isDate = v => v instanceof Date

class Files {
  static read(file = 'page.html') {
    const content = readFileSync(file, { encoding: 'utf-8' })
    return content.trim()
  }

  static write(content, file) {
    writeFileSync(file, content)
  }

  static parseUrls() {
    const html = readFileSync('urls_input.txt', 'utf-8')
    const finded = html.matchAll(rxp).filter(String)
    const urls = [...new Set(finded)]
    const curl = urls.reduce(
      (a, s) => [
        ...a,
        `echo "Downloading ${i + 1}/${urls.length}..."`,
        `curl -o '${s.match(/[^\\\/](.+)$/im)?.[0]}' '${s}'`,
      ],
      ['#!/bin/sh\n\n'],
    )

    writeFileSync('urls_parsed.txt', urls.join('\n'), 'utf-8')
    writeFileSync('urls_save.sh', curl.join('\n'), 'utf-8')

    return urls
  }
}

class Time {
  static DATE_INIT = new Date()

  static MS_INIT = this.DATE_INIT.getTime()
  static MS_1970 = new Date(0).getTime()
  static MS_2000 = new Date('01/01/2000').getTime()
  static MS_2001 = new Date('01/01/2001').getTime()
  static MS_SEC = 1000
  static MS_MIN = this.MS_SEC * 60
  static MS_HOUR = this.MS_MIN * 60
  static MS_DAY = this.MS_HOUR * 24
  static MS_WEEK = this.MS_DAY * 7
  static MS_YEAR = this.MS_DAY * 365

  static isMs(v) {
    return isNumber(v) && v > 0
  }

  static isMsPast(ms) {
    return this.isMs(ms) && ms < this.ms
  }

  static isMsFuture(ms) {
    return this.isMs(ms) && ms > this.ms
  }

  static isMsActual(ms, diff) {
    if (!this.isMs(ms)) {
      return false
    }

    if (!this.isMs(diff)) {
      diff = this.MS_HOUR
    }

    const current = this.ms
    const min = current - diff
    const max = current + diff
    const result = ms > min && ms < max

    if (!result) {
      warn({ message: 'Provided ms is not actual milliseconds value!', ms, diff, current, min, max })
    }

    return result
  }

  static isMsRange(v) {
    return isArray(v) && v.length === 2 && v.every(isNumber)
  }
  static isMsInRange(ms, range) {
    return ms > Math.min(...range) && ms < Math.max(...range)
  }
  static range(ms) {
    return {
      past: [0, Date.now()],
      sec: [ms - MS_SEC, ms + MS_SEC],
      min: [ms - MS_MIN, ms + MS_MIN],
      hour: [ms - MS_HOUR, ms + MS_HOUR],
      day: [ms - MS_DAY, ms + MS_DAY],
      week: [ms - MS_WEEK, ms + MS_WEEK],
      year: [ms - MS_YEAR, ms + MS_YEAR],
    }
  }

  static get ms() {
    return Date.now()
  }
  static get obj() {
    return new Date()
  }

  static toSrc(ms) {
    if (!this.isMs(ms)) {
      ms = this.ms
    }

    return new Date(ms)
  }

  static isDate(obj) {
    return obj instanceof Date
  }

  static toExamples(ms = now()) {
    if (!isNumber(ms)) {
      ms = Date.now()
    }

    const obj = new Date(ms)
    const results = {
      ms,
      toString: obj.toString(),
      toDateString: obj.toDateString(),
      toTimeString: obj.toTimeString(),
      toLocaleString: obj.toLocaleString(),
      toLocaleDateString: obj.toLocaleDateString(),
      toLocaleTimeString: obj.toLocaleTimeString(),
      valueOf: obj.valueOf(),
      getTime: obj.getTime(),
      getFullYear: obj.getFullYear(),
      getUTCFullYear: obj.getUTCFullYear(),
      getMonth: obj.getMonth(),
      getUTCMonth: obj.getUTCMonth(),
      getDate: obj.getDate(),
      getUTCDate: obj.getUTCDate(),
      getDay: obj.getDay(),
      getUTCDay: obj.getUTCDay(),
      getHours: obj.getHours(),
      getUTCHours: obj.getUTCHours(),
      getMinutes: obj.getMinutes(),
      getUTCMinutes: obj.getUTCMinutes(),
      getSeconds: obj.getSeconds(),
      getUTCSeconds: obj.getUTCSeconds(),
      getMilliseconds: obj.getMilliseconds(),
      getUTCMilliseconds: obj.getUTCMilliseconds(),
      getTimezoneOffset: obj.getTimezoneOffset(),
    }
    /* { 
      ms: 1684421841047, 
      toString: 'Thu May 18 2023 17:57:21 GMT+0300 (Eastern European Summer Time)', 
      toDateString: 'Thu May 18 2023', 
      toTimeString: '17:57:21 GMT+0300 (Eastern European Summer Time)', 
      toLocaleString: '5/18/2023, 5:57:21 PM', 
      toLocaleDateString: '5/18/2023', 
      toLocaleTimeString: '5:57:21 PM', 
      valueOf: 1684421841047, 
      getTime: 1684421841047, 
      getFullYear: 2023, 
      getUTCFullYear: 2023, 
      getMonth: 4, 
      getUTCMonth: 4, 
      getDate: 18, 
      getUTCDate: 18, 
      getDay: 4, 
      getUTCDay: 4, 
      getHours: 17, 
      getUTCHours: 14, 
      getMinutes: 57, 
      getUTCMinutes: 57, 
      getSeconds: 21, 
      getUTCSeconds: 21, 
      getMilliseconds: 47, 
      getUTCMilliseconds: 47, 
      getTimezoneOffset: -180
    } */

    return results
  }
}

module.exports = {
  isExist,
  isNumber,
  isString,
  isObject,
  isLength,
  isDate,
  Time,
}
