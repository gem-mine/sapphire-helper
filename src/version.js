const { exec } = require('./cmd')
const { PC, MOBILE, IE8, MORDEN, TIMEOUT, API } = require('./constant')
const { runNpm } = require('./npm')
const axios = require('axios')

/**
 * 获取项目中使用的 gem-mine-template 的分支
 */
function getNativeBranch(context) {
  const { platform, ie8, native_branch: nativeBranch } = context
  if (nativeBranch) {
    return nativeBranch
  }
  let branch
  if (platform === PC) {
    if (ie8) {
      branch = IE8
    } else {
      branch = MORDEN
    }
  } else if (platform === MOBILE) {
    branch = MOBILE
  }
  return branch
}

/**
 * 检测本地 gem-mine 版本
 */
function checkCliVersion() {
  let localVersion, remoteVersion
  try {
    localVersion = exec('gem-mine --version')
    try {
      remoteVersion = exec(`npm show gem-mine version`, {
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
 * 检测当前项目使用的 gem-mine-template 版本
 */
async function checkNativeVersion(context) {
  const { native_version: localVersion } = context
  let remoteVersion
  try {
    const { data } = await axios.get(`${API}/native/master-${getNativeBranch(context)}/version`)
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

/**
 * 检测当前项目使用的经典代码骨架的版本
 */
async function checkClassicVersion(context) {
  let { classic_git: git, from_id: projectId, classic_branch: branch, classic_version: localVersion } = context
  let classicGit, remoteVersion
  try {
    if (git) {
      classicGit = git.replace(/\.git$/, '')
      const { data } = await axios.get(`${API}/classic/${projectId}/${branch}`)
      remoteVersion = data.version
    }
  } catch (e) {}
  return { localVersion, remoteVersion, git: classicGit, branch }
}

module.exports = {
  getNativeBranch,
  checkCliVersion,
  checkNativeVersion,
  checkUIVersion,
  checkClassicVersion
}
