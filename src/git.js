const path = require('path')
const fs = require('fs-extra')
const request = require('./request')
const { exec } = require('./cmd')
const { TIMEOUT } = require('./constant')

/**
 * 通过 git remote 获取 git 关联的远程主机信息
 */
function getGitInfo(root) {
  const result = {}
  try {
    const data = exec(`git remote`, { cwd: root })
      .toString()
      .trim()
      .split('\n')

    data.forEach(function (name) {
      if (name) {
        result[name] = exec(`git remote get-url ${name}`, { cwd: root })
          .toString()
          .trim()
      }
    })
  } catch (e) {}
  return result
}

/**
 * 通过 package.json 来获取放置在 github 上的当前项目的版本
 */
function getVersionFromGithub({ username = 'gem-mine', project, branch = 'master' }) {
  const url = `https://raw.githubusercontent.com/${username}/${project}/${branch}/package.json`
  try {
    const res = request.get(url, {
      timeout: TIMEOUT
    })
    const { version } = JSON.parse(res.body.toString())
    return version
  } catch (e) {}
}

/**
 * 获取 git 工程根目录
 */
function getGitRepo(root) {
  let flag = 20
  let p = root
  let s
  let existGit = false
  while (flag > 0) {
    existGit = fs.existsSync(path.join(p, '.git'))
    if (existGit) {
      existGit = true
      break
    }
    s = path.dirname(p)
    if (s === p) {
      break
    }
    p = s
    flag -= 1
  }
  return {
    root: existGit ? p : root,
    git: existGit
  }
}

exports.getGitInfo = getGitInfo
exports.getVersionFromGithub = getVersionFromGithub
exports.getGitRepo = getGitRepo
