const { readFileSync, writeFileSync, readdirSync, statSync, existsSync } = require('fs')

const { debug } = console
const { isArray } = Array
const { now } = Date

class Files {
  static DIR = __dirname
  static ROOT = resolve(__dirname, '../')
  static IMGS = resolve(__dirname, '../images')
  static REFS = resolve(__dirname, '../references')

  static read(file) {
    const results = { file, content: null }
    try {
      if (!existsSync(file)) throw new Error('Not exists!')
      if (!statSync(file).isFile()) throw new Error('Not file!')
      results.content = readFileSync(file, { encoding: 'utf-8' }).toString()
    } catch (e) {
      results.error = e
    }

    return results
  }

  static write(file, data) {
    try {
      writeFileSync(file, data, { encoding: 'utf-8' })
      console.info(`${data.length} chars was saved to ${file}`)
      return true
    } catch (e) {
      console.warn('Error on saving data to file!')
      console.error(e)
      return false
    }
  }

  static ls(dir) {
    const results = { dir, dirs: null, files: null }
    try {
      const finded = readdirSync(dir, { withFileTypes: true, encoding: 'utf-8' }).filter(Boolean)
      results.dirs = finded.filter(f => f.isDirectory()).map(f => f.name)
      results.files = finded.filter(f => f.isFile()).map(f => f.name)
    } catch (e) {
      results.error = e
    }

    return results
  }
}

class Logs {
  static toMessage(text = 'Message', level = 'Log') {
    return `\n---> ${level} <---\n${text}\n`
  }

  static toJson(...values) {
    return JSON.stringify(values, null, '\t')
  }

  static show(value, level = 'default') {
    switch (level) {
      case 'log':
        console.log(value)
      case 'debug':
        console.debug(value)
      case 'warn':
        console.warn(value)
      case 'error':
        console.error(value)
      case 'default':
        console.info(value)
      default: {
        if (typeof value === 'object' && value !== null) console.table(value)
        else console.log(value)
      }
    }
  }

  static debug(value, message = 'Debug Message') {
    debug({ message: this.toMessage(message), value })
  }
}

class Urls {
  static read(file) {
    const filepath = resolve(__dirname, file)
    const content = readFileSync(filepath, { encoding: 'utf-8' })

    return content.trim()
  }

  static parse(text) {
    const finded = text.matchAll(rxp).filter(String)
    return [...new Set(finded)]
  }

  static parseUrls() {
    const text = readFileSync('urls_input.txt', 'utf-8')
    const urls = this.parse(text)
    const curl = urls.reduce(
      (a, s) => [
        ...a,
        `echo "Downloading ${i + 1}/${urls.length}..."`,
        `curl -o '${s.match(/[^\\\/](.+)$/im)?.[0]}' '${s}' --max-time 10`,
      ],
      ['#!/bin/sh\n\n'],
    )

    writeFileSync('urls_parsed.txt', urls.join('\n'), 'utf-8')
    writeFileSync('urls_save.sh', curl.join('\n'), 'utf-8')

    return urls
  }
}

class Time {
  static MS_INIT = now()
  static MS_1970 = new Date(0).getTime()
  static MS_2000 = new Date('01/01/2000').getTime()
  static MS_2001 = new Date('01/01/2001').getTime()
  static MS_SEC = 1000
  static MS_MIN = this.MS_SEC * 60
  static MS_HOUR = this.MS_MIN * 60
  static MS_DAY = this.MS_HOUR * 24
  static MS_WEEK = this.MS_DAY * 7
  static MS_YEAR = this.MS_DAY * 365

  static toExamples(ms = now()) {
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

class Is {
  static defined = v => v !== null && v !== undefined
  static number = v => typeof v === 'number'
  static string = v => typeof v === 'string'
  static object = v => typeof v === 'object' && v !== null && !Array.isArray(v)
  static length = v => (isArray(v) || isString(v)) && v.length > 0
  static date = v => v instanceof Date
}

module.exports = {
  Is,
  Time,
  Logs,
  Urls,
  Files,
}
