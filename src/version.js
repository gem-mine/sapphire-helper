const axios = require('axios')
const { exec } = require('./cmd')
const { TIMEOUT, API } = require('./constant')
const { runNpm } = require('./npm')

/**
 * 获取项目中使用的 sapphire-template 的分支
 */
function getTemplateBranch(context) {
  const { platform } = context
  const branch = platform
  return branch
}

/**
 * 检测本地 sapphire-template 版本
 */
function checkCliVersion() {
  let localVersion, remoteVersion
  try {
    localVersion = exec('sapphire --version')
    try {
      remoteVersion = exec(`npm show @gem-mine/sapphire version`, {
        timeout: TIMEOUT
      })
    } catch (e) {
      // 获取远程版本失败（例如网络原因）
      remoteVersion = undefined
    }
  } catch (e) {
    // 本地未安装
    localVersion = undefined
  }
  return { localVersion, remoteVersion }
}

/**
 * 检测当前项目使用的 sapphire-template 版本
 */
async function checkTemplateVersion(context) {
  const { template_version: localVersion } = context
  let remoteVersion
  try {
    const { data } = await axios.get(`${API}/template/master-${getTemplateBranch(context)}/version`)
    remoteVersion = data.version
  } catch (e) {}
  return { localVersion, remoteVersion }
}

/**
 * 检测当前项目中使用的 UI 库的版本
 */
function checkUIVersion(context) {
  const { ui, ui_version: localVersion } = context
  let remoteVersion
  try {
    remoteVersion = runNpm(`npm show ${ui} version`, {
      timeout: TIMEOUT
    })
  } catch (e) {}
  return { localVersion, remoteVersion }
}

module.exports = {
  getTemplateBranch,
  checkCliVersion,
  checkTemplateVersion,
  checkUIVersion
}
