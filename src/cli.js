import program from 'commander'

import {version} from '../package.json'

const collectHttpHeaders = (val, obj) => {
  const [key, value] = val.split(':')
  obj[key] = value
  return obj
}

program.version(version)

program
  .option('-p, --port <number>', 'Port to use', str => parseInt(str, 10), 3000)
  .option('-h, --host <value>', 'Host address', 'localhost')
  .option('-b, --body <text>', 'Response Body(text to serve)')
  .option(
    '-H, --http-header <value>',
    'HTTP Headers(ex: `-H "Content-Type:application/json" -H ".."`)',
    collectHttpHeaders,
    {},
  )

program.parse(process.argv)

export const getOptions = () => {
  return program.opts()
}
