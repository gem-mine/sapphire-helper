const chalk = require('chalk')
const Box = require('boxen')

function printBox({ text, border = 'green', center = true }) {
  const box = Box(text, {
    padding: {
      left: 10,
      right: 10
    },
    borderColor: border,
    borderStyle: 'round',
    float: center ? 'center' : 'left'
  })

  console.log(box)
}

function patchZero(n) {
  if (n < 10) {
    return `0${n}`
  }
  return n
}

function getTime() {
  const date = new Date()
  return `${patchZero(date.getHours())}:${patchZero(date.getMinutes())}:${patchZero(date.getSeconds())} `
}

function print({ message, color, time = true }) {
  let timeInfo
  if (time) {
    timeInfo = getTime()
  }
  console.log(`> ${chalk.cyan(timeInfo)}${chalk[color](message)}`)
}

exports.printBox = printBox
exports.log = {
  info: function (message) {
    print({ message, color: 'cyan' })
  },
  warning: function (message) {
    print({ message, color: 'yellow' })
  },
  error: function (message) {
    print({ message, color: 'red' })
  }
}
