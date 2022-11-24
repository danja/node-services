const http = require('http')
const server = http.createServer()

server
  .on('request', (request, response) => {
    let body = []
    request
      .on('data', chunk => {
        body.push(chunk)
      })
      .on('end', () => {
        body = Buffer.concat(body).toString()
        response.status(200)
        response.setHeader('Content-Type', 'text/html')

        /* CORS */
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
        response.setHeader('Access-Control-Max-Age', 2592000) // 30 days -

        response.write(`${request.method} ${request.url}`)

        response.write(toHTML(JSON.parse(JSON.stringify(request.headers)))) // crazy but true

        // response.write(JSON.stringify(body))
        response.end()
      })
  })
  .listen(3001)

function toHTML (json) {
  var html = '<html><body>'

  for (var key in json) {
    html += '<strong>' + key + '</strong> : ' + json[key] + '<br/>'
  }

  html += '</body></html>'
  return html
}
