const { readJsonSync, writeJsonSync } = require('fs-extra')
const { getIn, setIn } = require('zero-immutable')

exports.readJSON = readJsonSync
exports.writeJSON = function (path, object) {
  return writeJsonSync(path, object, {
    spaces: 2
  })
}

exports.getIn = getIn
exports.setIn = setIn
