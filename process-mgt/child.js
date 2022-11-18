// process.on('message', function(msg) {
// 	console.log('子进程接收的参数：', msg)
// 	msg.a = msg.a.toUpperCase()
// 	process.send(msg)
// })

/* 计算大数据量 */
process.on('message', function(num) {
	const sum = Array(num + 1).fill(-1).reduce((prev, _, index) => (prev +=index, prev), 0)
	process.send(sum)
})