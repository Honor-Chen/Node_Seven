import {exec, execSync, execFileSync} from 'node:child_process';

function execFunc() {
	const pwd = execSync('pwd')
	console.log(pwd.toString())

	const ls = execSync('ls -lh')
	console.log(ls.toString())

	const file = './../download/index.html'
	const execProcess = exec(`git log -1 --pretty="%ci" ${file}`)
	execProcess.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`)
		console.log(new Date(data))
	})
}
execFunc()

function execSyncFunc() {
	const filePath = './zx.mjs'
	const execData = execFileSync(process.execPath, [filePath], {encoding: 'utf-8'});
	console.log(execData);
}
// execSyncFunc()