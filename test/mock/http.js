const http = require('http')

function createServer(port) {
  return http
    .createServer(function (request, response) {
      const { method } = request
      const result = {}
      if (method === 'POST') {
        result.name = 'jerry'
      } else if (method === 'GET') {
        result.name = 'tom'
      }
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(result))
    })
    .listen(port)
}

createServer(8888)
module.exports = createServer
