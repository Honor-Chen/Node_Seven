/* 
	!:: net 和 http 的区别？？？
	理解：
		单工通信
		半双工通信
		全双工通信（数据包序号）
*/

const net = require('net');
const socket = new net.Socket()
const lessonList = require('./mock');
const lessonKeys = Object.keys(lessonList)

socket.connect({
	host: '127.0.0.1',
	port: 8001
})

// 数据包序号
// 监听 socket 返回的信息
socket.on('data', buffer => {
	// 数据包序号
	// buffer 的切割使用最新的 buf.subarray()
	const seqBuffer = buffer.subarray(0, 2)
	const titleBuffer = buffer.subarray(2)

	// 注意：此时使用 readInt16BE 来读取设置的前两位的数据包序号。
	console.log(seqBuffer.readInt16BE(), titleBuffer.toString())
})

let seq = 0
function encode(id) {
	const buffer = Buffer.alloc(6)
	buffer.writeInt16BE(seq)
	buffer.writeInt32BE(lessonKeys[id], 2)

	console.log(seq, lessonKeys[id]); // 课程ID
	seq++

	return buffer
}

setInterval(() => {
	const index = Math.floor(Math.random() * lessonKeys.length)
	socket.write(encode(index))
}, 10 + Math.floor(Math.random() * 100));
