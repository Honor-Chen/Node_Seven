const net = require('net');
const lessonList = require('./mock');

const server = net.createServer((socket) => {
	socket.on('data', buffer => {
		const seqBuffer = buffer.subarray(0, 2)
		const lessonId = buffer.readInt32BE(2)

		console.log('课程ID', lessonId)

		setTimeout(() => {
			const content = Buffer.concat([
				seqBuffer,
				// !：注意，此时是一个 Buffer 构造函数
				Buffer.from(lessonList[lessonId])
			])
			socket.write(content)
		}, Math.ceil(Math.random() * 500 + 10));
	})
})

server.listen(8001)