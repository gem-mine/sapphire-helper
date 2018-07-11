const assert = require('assert')
const path = require('path')
const { readJSON, writeJSON } = require('../src/json')

describe('读写 JSON 文件 - readJSON/writeJSON', () => {
  const file = path.join(__dirname, 'mock/data.json')
  const origin = readJSON(file)
  after(() => {
    writeJSON(file, origin)
  })
  it('读取 JSON 文件', () => {
    const data = readJSON(file)
    assert.equal(data.name, 'tom')
  })
  it('写入 JSON 文件', () => {
    let data = readJSON(file)
    data.name = 'lucy'
    writeJSON(file, data)
    data = readJSON(file)
    assert.equal(data.name, 'lucy')
  })
})
