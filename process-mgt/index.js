/* 
	child process
	cluster
*/
const { spawn } = require('node:child_process')

/* const child = spawn('node', ['a', 'b'])
child.stdout.on('data', function(data) {
	console.log('spawn.stdout:', data)
})
child.stderr.on('error', function(err) {
	console.error(err)
})
child.on('close', function(code) {
	console.log('child process exited with code:', code);
}) */



/* 若两个进程都是 Node 进程，则可通过 IPC 进行进程间通信 */
const child = spawn('node', ['child.js'], { stdio: [0, 1, 2, 'ipc'] })
/* child.on('message', function(msg) {
	console.log('子进程传给主进程的参数：', msg);
})
child.send({ a: 'hello' }) */

// 计算大数据量
child.on('message', function(newNum) {
	console.log('newNum: ', newNum)
})
child.send(100)
console.log('还能继续执行后面代码吗？？？？');