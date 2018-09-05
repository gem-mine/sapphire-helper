const { SXP_PREFIX } = require('./constant')

function getUIName(ui) {
  if (ui.indexOf(SXP_PREFIX) === 0) {
    return ui.replace(`${SXP_PREFIX}/`, '')
  }
  return ui
}

exports.getUIName = getUIName
