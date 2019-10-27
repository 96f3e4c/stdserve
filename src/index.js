import fs from 'fs'
import http from 'http'
import colors from 'colors'

import {getOptions} from './cli'

const options = getOptions()

const getStdIn = () => {
  console(
    colors.white('Enter text to serve and press Enter followed by Ctrl+d :'),
  )
  return fs.readFileSync(0, 'utf-8')
}

const logRequest = (request, response) => {
  const {
    url,
    connection: {remoteAddress},
    headers,
  } = request
  console.log(
    [
      colors.gray(`[${response.statusCode}]`),
      colors.gray(remoteAddress),
      colors.yellow(url),
      colors.white(headers['user-agent']),
    ].join(' '),
  )
}

const server = http.createServer((request, response) => {
  const {url} = request
  if (url === '/') {
    Object.entries(options.httpHeader).forEach(([key, value]) => {
      response.setHeader(key, value)
    })
    response.statusCode = 200
    response.write(options.body || getStdIn())
  } else {
    response.statusCode = 404
  }
  logRequest(request, response)
  response.end()
})

server.listen(options.port, options.host, error => {
  if (error) {
    throw error
  }
  console.log(
    `${colors.cyan('Server running on :')} ${options.host}:${options.port}\n\n`,
  )
})
