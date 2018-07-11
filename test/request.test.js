const assert = require('assert')
const request = require('../src/request')
const { exec } = require('child_process')

describe('request 阻塞请求库', () => {
  const port = 8888
  const url = `http://127.0.0.1:${port}`
  let process
  before(() => {
    console.log(`start server: ${url}`)
    process = exec(`node ${__dirname}/mock/http.js`)
  })
  after(() => {
    process.kill()
    console.log('stop server')
  })
  it('get 请求', done => {
    setTimeout(function () {
      const res = request.get(url)
      assert.equal(res.statusCode, 200)
      assert.equal(res.url, url)
      assert.ok(res.body.length > 0)

      const data = JSON.parse(res.body.toString())
      assert.equal(data.name, 'tom')
      done()
    }, 100)
  })
  it('post 请求', done => {
    setTimeout(function () {
      const res = request.post(url)
      assert.equal(res.statusCode, 200)
      assert.equal(res.url, url)
      assert.ok(res.body.length > 0)

      const data = JSON.parse(res.body.toString())
      assert.equal(data.name, 'jerry')
      done()
    }, 100)
  })
})
