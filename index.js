const { exec, execWithSilent, execWithProcess, commandExists } = require('./src/cmd')
const { getGitInfo, getVersionFromGithub, getGitRepo } = require('./src/git')
const { readJSON, writeJSON, getIn, setIn } = require('./src/json')
const { runNpm, autoSetRegistry } = require('./src/npm')
const { printBox, log } = require('./src/print')
const request = require('./src/request')
const { getUIName } = require('./src/sdp')
const {
  getTemplateBranch,
  checkCliVersion,
  checkTemplateVersion,
  checkUIVersion,
  checkClassicVersion
} = require('./src/version')

const CONSTANT = require('./src/constant')

module.exports = {
  //
  exec,
  execWithSilent,
  execWithProcess,
  commandExists,
  //
  getGitInfo,
  getVersionFromGithub,
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
  request,
  //
  getUIName,
  //
  getTemplateBranch,
  checkCliVersion,
  checkTemplateVersion,
  checkUIVersion,
  checkClassicVersion,
  //
  CONSTANT
}
