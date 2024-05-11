import {
	spawn,
	spawnSync
} from 'node:child_process';

{
	// 示例一:
	// 一个平平无奇的 hello, world
	function f1() {
		const ls = spawn('echo', ['hello, world'])

		console.log('PID:', ls.pid)

		// 事件中接收该进程的标准输出
		// !:: data 默认输出为 Buffer 类型，需要转换为字符串
		ls.stdout.on('data', (data) => {
			console.log('STDOUT', data)
			console.log('STDOUT STRING', data.toString())
		})

		ls.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`)
		})

		ls.on('close', (code) => {
			console.log('CLOSE', code)
		})

		ls.on('exit', (code) => {
			// 获得该进程的 EXIT CODE，如果是 0,代表执行成功
			console.log('EXIT', code)
		})
	}
	// f1()
}

{
	// 示例二:
	// 展示当前工作文件目录和当前目录下的文件列表
	function f2() {
		const pwd = spawnSync('pwd')
		console.log(pwd.stdout.toString())

		const ls = spawnSync('ls', ['-lh'])
		console.log(ls.stdout.toString())
	}
	// f2()

	// 示例三: 等同于 f2()
	// 可以设置 stdio:'inherit'，表示将子进程的标准输入/输出/错误流与父进程共享
	// spawnSync('pwd', {stdio: 'inherit'})
	// spawnSync('ls', ['-lh'], {stdio: 'inherit'})
}

{
	// 示例四:
	// 
	function f3() {
		const {
			stdout,
			stderr
		} = spawn('netstat', ['-an'], {})
		stdout.on('data', stream => {
			console.log(stream.toString())
		})

		stderr.on('data', error => {
			console.error(error.toString())
		})
	}
	// f3()
}

{
	function executeNodeScript(source, {
		args = []
	} = {}) {
		return new Promise((resolve, reject) => {
			const child = spawn(process.execPath, [...args, '-e', source])
			let result = ''

			child.stdout.on('data', (data) => {
				result += data
			})

			child.on('close', (code) => {
				if (code !== 0) {
					reject({
						command: `node ${args.join(' ')}`,
					})
					return
				}
				resolve(result)
			})
		})
	}

	// executeNodeScript(`
	// const a = 'hello spawn...';
	// console.log(a)
	// `).then((o) => {
	// 	console.log("🌐 ~ o:", o)
	// })
}