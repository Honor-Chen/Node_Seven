const http = require('http');

const options = {
	hostname: '127.0.0.1',
	port: 80,
	path: '/info',
	method: 'POST',
	headers: {
	  'Content-Type': 'text/plain'
	}
}
const req = http.request(options, (res) => {
	console.log(`_status:${res.statusCode}`);
	console.log(`_headers:${JSON.stringify(res.headers)}`);

	res.setEncoding('utf8')
	res.on('data', chunk => {
		console.log(`chunk: ${chunk}`);
	})
	res.on('end', () => {
		console.log(`no more data in response`);
	})
})

req.on('error', err => {
	console.log(`problem with request ${err.message}`);
})
req.write('hello world22')
req.end()