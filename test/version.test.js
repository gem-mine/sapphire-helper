const assert = require('assert')
const path = require('path')
const {
  checkCliVersion,
  getTemplateBranch,
  checkTemplateVersion,
  checkUIVersion,
  checkClassicVersion
} = require('../src/version')
const { readJSON } = require('../src/json')

function check({ key, localVersion, remoteVersion }) {
  if (localVersion && remoteVersion) {
    const reg = /^(\d+\.){2}\d+$/
    assert.ok(reg.test(localVersion))
    assert.ok(reg.test(remoteVersion))
    if (localVersion === remoteVersion) {
      console.log(`${key} 本地版本已经是最新 ${localVersion}`)
    } else {
      console.log(`${key} 本地版本 ${localVersion} 和 远程版本 ${remoteVersion} 不一致`)
    }
  } else {
    if (localVersion) {
      console.log(`${key} 本地版本 ${localVersion}`)
    } else {
      console.log(`${key} 未能获取到本地版本`)
    }
    if (remoteVersion) {
      console.log(`${key} 远程版本 ${localVersion}`)
    } else {
      console.log(`${key} 未能获取到远程版本`)
    }
  }
}

describe('检测一系列版本信息', () => {
  let context
  before(() => {
    context = readJSON(path.join(__dirname, 'mock/.gem-mine'))
  })

  it('检测本地 gem-mine 版本 - checkCliVersion', () => {
    const key = 'gem-mine'
    checkCliVersion(({ localVersion, remoteVersion }) => {
      check({ key, localVersion, remoteVersion })
    })
  })

  it('获取项目中用的 gem-mine-template 分支 - getTemplateBranch', () => {
    const branch = getTemplateBranch(context)
    assert.equal(branch, 'morden')
  })

  it('检测项目中用的 gem-mine-template 版本 - checkTemplateVersion', () => {
    const key = 'gem-mine-template'
    checkTemplateVersion(context, ({ localVersion, remoteVersion }) => {
      check({ key, localVersion, remoteVersion })
    })
  })

  it('检测项目中用的 UI库 版本 - checkUIVersion', () => {
    const key = `ui库 ${context.ui}`
    checkUIVersion(context, ({ localVersion, remoteVersion }) => {
      check({ key, localVersion, remoteVersion })
    })
  })

  it('检测项目中用的 经典代码骨架 版本 - checkClassicVersion', () => {
    const key = `经典代码骨架`
    const { classic_git: git } = context
    if (git) {
      console.log(`使用了经典代码骨架：${git}`)
      checkClassicVersion(context, ({ localVersion, remoteVersion }) => {
        check({ key, localVersion, remoteVersion })
      })
    } else {
      console.log(`没有使用 ${key}`)
    }
  })
})
