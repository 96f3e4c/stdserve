import http from 'http'
import colors from 'colors'

import {getOptions} from './cli'

const options = getOptions()

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

const getStdIn = () =>
  new Promise(resolve => {
    let data = ''
    let canShowStdInPrompt = true
    process.stdin.on('readable', () => {
      let chunk = process.stdin.read()
      if (chunk === null) {
        if (canShowStdInPrompt) {
          console.log(
            colors.white(
              'Enter text to serve and press Enter and then Ctrl+d :',
            ),
          )
          canShowStdInPrompt = false
        }
      } else {
        canShowStdInPrompt = false
        do {
          data += chunk
          chunk = process.stdin.read()
        } while (chunk !== null)
      }
    })
    process.stdin.on('end', () => {
      resolve(data)
    })
  })

const init = async () => {
  const resBody = options.body || (await getStdIn())
  const server = http.createServer((request, response) => {
    const {url} = request
    if (url === '/') {
      Object.entries(options.httpHeader).forEach(([key, value]) => {
        response.setHeader(key, value)
      })
      response.statusCode = 200
      response.write(resBody)
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
      `${colors.cyan('Server running on :')} ${options.host}:${options.port}\n`,
    )
  })
}
init()
