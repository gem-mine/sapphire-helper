const assert = require('assert')
const path = require('path')
const { checkCliVersion, getTemplateBranch, checkTemplateVersion, checkUIVersion } = require('../src/version')
const { readJSON } = require('../src/json')

function check({ key, localVersion, remoteVersion }) {
  if (localVersion && remoteVersion) {
    if (localVersion === remoteVersion) {
      console.log(`${key} 本地版本已经是最新 ${localVersion}`)
    } else {
      console.log(`${key} 本地版本 ${localVersion} 和 远程版本 ${remoteVersion} 不一致`)
    }
    const reg = /^(\d+\.){2}\d+/
    assert.ok(reg.test(localVersion))
    assert.ok(reg.test(remoteVersion))
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

describe('检测 template 相关版本', () => {
  let context
  before(() => {
    context = readJSON(path.join(__dirname, 'mock/.sapphire'))
  })

  it('检测本地 sapphire 版本 - checkCliVersion', () => {
    const key = 'sapphire'
    const { localVersion, remoteVersion } = checkCliVersion()
    check({ key, localVersion, remoteVersion })
  })

  it('获取项目中用的 sapphire-template 分支 - getTemplateBranch', () => {
    const branch = getTemplateBranch(context)
    assert.equal(branch, 'pc')
  })

  it('检测项目中用的 sapphire-template 版本 - checkTemplateVersion', async () => {
    const key = 'sapphire-template'
    const { localVersion, remoteVersion } = await checkTemplateVersion(context)
    check({ key, localVersion, remoteVersion })
  })

  it('检测项目中用的 UI库 版本 - checkUIVersion', () => {
    const key = `ui库 ${context.ui}`
    const { localVersion, remoteVersion } = checkUIVersion(context)
    check({ key, localVersion, remoteVersion })
  })
})
