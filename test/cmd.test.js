const assert = require('assert')
const path = require('path')
const { exec, execWithProcess, execWithSilent, commandExists } = require('../src/cmd')

describe('检测命令是否存在 - commandExists', () => {
  it('检测 node 命令', () => {
    const flag = commandExists('node')
    assert.ok(flag)
  })
  it('检测 not_exist_command 命令', () => {
    const flag = commandExists('not_exist_command')
    assert.ok(!flag)
  })
})

describe('命令执行 - exec', () => {
  it('获取 node 版本', () => {
    const version = exec('node -v')
    assert.ok(/v\d+\.\d+\.\d+/.test(version))
  })

  it('进入目录执行命令', () => {
    const dir = path.join(__dirname, 'mock')
    const dist = exec(`node dir.js`, { cwd: dir })
    assert.equal(dir, dist)
  })
})

describe('命令静默执行 - execWithSilent', () => {
  it('静默执行不会得到返回值', () => {
    const version = execWithSilent('node -v')
    assert.equal(version, undefined)

    const dir = path.join(__dirname, 'mock')
    const dist = execWithSilent(`node dir.js`, { cwd: dir })
    assert.equal(dist, undefined)
  })
})

describe('命令执行可以看到执行过程 - execWithProcess', () => {
  it('查看 ping 过程', () => {
    const delta = 1500
    const start = Date.now()
    try {
      execWithProcess('ping www.baidu.com', {
        timeout: delta
      })
    } catch (e) {}
    const end = Date.now()
    assert.ok(end - start >= delta)
  })
})
