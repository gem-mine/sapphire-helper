const assert = require('assert')
const { getUIName } = require('../src/sxp')
const { SXP_PREFIX } = require('../src/constant')

describe('获取 SXP 上的 UI 名称 - getUIName', () => {
  it('获取 fish 名称', () => {
    const fish = `${SXP_PREFIX}/fish`
    assert.equal(getUIName(fish), 'fish')
  })
})
