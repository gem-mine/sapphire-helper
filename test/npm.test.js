const assert = require('assert')
const { runNpm, autoSetRegistry } = require('../src/npm')
const { exec } = require('../src/cmd')
const { SXP_PREFIX, OFFICIAL_REGISTRY } = require('../src/constant')

describe('检测并自动设置 npm 源，如果使用的是官方源，自动切换为指定源（默认淘宝源） - autoSetRegistry', () => {
  it('源进行自动切换', () => {
    const origin = exec(`npm get registry`)
    const flag = autoSetRegistry()
    assert.equal(flag, origin === OFFICIAL_REGISTRY)
  })
})

describe('执行相关 npm 命令，自动识别是否使用 SXP 的 npm 镜像源 - npmRun', () => {
  it('获取 react 版本', () => {
    const version = runNpm(`npm show react version`)
    assert.ok(/^(\d+\.){2}\d+$/.test(version))
  })
  it('获取 fish 版本', () => {
    const start = Date.now()
    const delta = 5000
    try {
      const version = runNpm(`npm show ${SXP_PREFIX}/fish version`, {
        timeout: delta
      })
      assert.ok(/^(\d+\.){2}\d+$/.test(version))
    } catch (e) {
      const end = Date.now()
      // 如果不在内网会超时退出
      assert.equal(e.code, 'ETIMEDOUT')
      assert.ok(end - start >= delta)
    }
  })
})
