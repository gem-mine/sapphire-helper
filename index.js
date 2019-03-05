const { exec, execWithSilent, execWithProcess, commandExists } = require('./src/cmd')
const { getGitInfo, getGitRepo } = require('./src/git')
const { readJSON, writeJSON, getIn, setIn } = require('./src/json')
const { runNpm, autoSetRegistry } = require('./src/npm')
const { printBox, log } = require('./src/print')
const { getUIName } = require('./src/sxp')
const { getTemplateBranch, checkCliVersion, checkTemplateVersion, checkUIVersion } = require('./src/version')

const CONSTANT = require('./src/constant')

module.exports = {
  //
  exec,
  execWithSilent,
  execWithProcess,
  commandExists,
  //
  getGitInfo,
  getGitRepo,
  //
  readJSON,
  writeJSON,
  getIn,
  setIn,
  //
  runNpm,
  autoSetRegistry,
  //
  printBox,
  log,
  //
  getUIName,
  //
  getTemplateBranch,
  checkCliVersion,
  checkTemplateVersion,
  checkUIVersion,
  //
  CONSTANT
}
