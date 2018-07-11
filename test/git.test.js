const assert = require('assert')
const os = require('os')
const path = require('path')
const { getGitInfo, getVersionFromGithub, getGitRepo } = require('../src/git')

describe('获取 git 远程主机信息 - getGitInfo', () => {
  it('获取 gem-mine-helper 远程主机信息', () => {
    const info = getGitInfo(__dirname)
    assert.ok(info.hasOwnProperty('origin'))
    const arr = info.origin.split('/')
    assert.equal(arr[arr.length - 1], 'gem-mine-helper.git')
  })
  it('非 git 目录返回空对象', () => {
    const info = getGitInfo(os.tmpdir())
    assert.ok(Object.keys(info).length === 0)
  })
})

describe('获取 github 上的项目版本信息 - getVersionFromGithub', () => {
  it('获取 react 版本信息', () => {
    const project = 'react'
    const version = getVersionFromGithub({
      username: 'facebook',
      project,
      branch: '15-stable'
    })
    if (version) {
      assert.equal(version, '15.6.2')
    } else {
      // 可能由于网络清库哦无法获取
      assert.equal(version, undefined)
    }
  })
})

describe('判断所在目录是否处在 git 工程中 - getGitRepo', () => {
  it('判断当前目录', () => {
    const { root, git } = getGitRepo(__dirname)
    const dir = path.resolve(__dirname, '../')
    assert.equal(dir, root)
    assert.ok(git)
  })
  it('一个不在 git 的目录', () => {
    const { git } = getGitRepo(os.tmpdir())
    assert.ok(!git)
  })
})
