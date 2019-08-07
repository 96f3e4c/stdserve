const http = require('http');
const fs = require('fs');

const argFlags = {
    port: '-p',
    host: '-h',
    header: '-H',
    resBody: '-b',
    newLineInEnd: '-n',
}

let host = 'localhost';
let port = 3000;
let resBody = '';
const headers = {};

const server = http.createServer((request, response) => {
    const { url } = request;
    if (url === '/') {
        Object.entries(headers).forEach(([key, value]) => {
	    response.setHeader(key, value);
	});
	response.statusCode = 200;
        response.write(resBody);
        response.end();
    } else {
        response.statusCode = 404;
	response.end();
    }
});

const argv = process.argv;

if(argv.indexOf(argFlags.port) !== -1) {
    port = parseInt(argv[argv.indexOf(argFlags.port) + 1]);
}

if(argv.indexOf(argFlags.host) !== -1) {
    host = argv[argv.indexOf(argFlags.host) + 1];
}

let startIndex = 0;
let indexOfHeaderArg = argv.indexOf(argFlags.header, startIndex);
while(indexOfHeaderArg !== -1) {
    const [key, value] = argv[indexOfHeaderArg + 1].split(':');
    headers[key] = value;
    startIndex += 2;
    indexOfHeaderArg = argv.indexOf(argFlags.header, startIndex);
}

if(argv.indexOf(argFlags.resBody) !== -1) {
    resBody = argv[argv.indexOf(argFlags.resBody) + 1];
    if(argv.indexOf(argFlags.newLineInEnd) !== -1) {
        resBody += '\n';
    }
} else {
    const stdinBuffer = fs.readFileSync(0, 'utf-8');
    resBody = stdinBuffer;
}

server.listen(port, host);
