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

        response.writeHead(200, { 'Content-Type': 'text/html' })

        response.write(`${request.method} ${request.url}`)
        //  response.write(JSON.stringify(request.headers))
        response.write(toHTML(JSON.parse(JSON.stringify(request.headers))))

        response.write(JSON.stringify(body))
        response.end()
      })
  })
  .listen(8083)

function toHTML (json) {
  var html = '<html><body>'

  for (var key in json) {
    html += '<strong>' + key + '</strong> : ' + json[key] + '<br/>'
  }

  html += '</body></html>'
  return html
}
