const url = require('url')
const { exec } = require('./cmd')
const { PC, MOBILE, IE8, MORDEN, TIMEOUT } = require('./constant')
const { getVersionFromGithub } = require('./git')
const { runNpm } = require('./npm')

/**
 * 获取项目中使用的 gem-mine-template 的分支
 */
function getTemplateBranch(context) {
  const { platform, ie8, template_branch: templateBranch } = context
  if (templateBranch) {
    return templateBranch
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
function checkCliVersion(callback) {
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
    } finally {
      return callback({ localVersion, remoteVersion })
    }
  } catch (e) {
    // 本地未安装
    localVersion = undefined
    return callback({ localVersion, remoteVersion })
  }
}

/**
 * 检测当前项目使用的 gem-mine-template 版本
 */
function checkTemplateVersion(context, callback) {
  const { template_version: localVersion } = context
  const remoteVersion = getVersionFromGithub({
    project: 'gem-mine-template',
    branch: `master-${getTemplateBranch(context)}`
  })
  callback({ localVersion, remoteVersion })
}

/**
 * 检测当前项目中使用的 UI 库的版本
 */
function checkUIVersion(context, callback) {
  const { ui, ui_version: localVersion } = context
  let remoteVersion
  try {
    remoteVersion = runNpm(`npm show ${ui} version`, {
      timeout: TIMEOUT
    })
  } catch (e) {
  } finally {
    callback({ localVersion, remoteVersion })
  }
}

/**
 * 检测当前项目使用的经典代码骨架的版本
 */
function checkClassicVersion(context, callback) {
  let { classic_git: git, classic_branch: branch, classic_version: localVersion } = context
  let classicGit, remoteVersion
  try {
    if (git) {
      classicGit = git.replace(/\.git$/, '')
      const obj = url.parse(classicGit)
      const info = obj.pathname.split('/')
      const username = info[1]
      const project = info[2]

      remoteVersion = getVersionFromGithub({
        username,
        project,
        branch
      })
    }
  } catch (e) {
  } finally {
    callback({ localVersion, remoteVersion, git: classicGit, branch })
  }
}

module.exports = {
  getTemplateBranch,
  checkCliVersion,
  checkTemplateVersion,
  checkUIVersion,
  checkClassicVersion
}
