const assert = require('assert')
const { getUIName } = require('../src/sdp')
const { SDP_PREFIX } = require('../src/constant')

describe('获取 SDP 上的 UI 名称 - getUIName', () => {
  it('获取 fish 名称', () => {
    const fish = `${SDP_PREFIX}/fish`
    assert.equal(getUIName(fish), 'fish')
  })
})
