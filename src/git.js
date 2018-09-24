const path = require('path')
const fs = require('fs-extra')
const { exec } = require('./cmd')

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
exports.getGitRepo = getGitRepo
