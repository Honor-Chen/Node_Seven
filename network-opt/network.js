const Http = require('http')

Http.createServer((req, res) => {
	let body = []

	req.on('data', (chunk) => {
		body.push(chunk)
	})
	req.on('end', () => {
		body = Buffer.concat(body)
		// console.log('服务端 body:', body.toString())
	})

	res.writeHead(200, {
		'Content-Type': 'text/plain'
	})
	console.log(`_body: ${body.toString()}`);
	res.end(body.toString())
}).listen(80)