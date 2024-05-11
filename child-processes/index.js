const {
	execFile,
	exec
} = require('node:child_process');
const spawn = require('cross-spawn')

const child = execFile('node', ['--version'], (err, stdout, stderr) => {
	if (err) {
		throw err;
	}
	console.log(stdout);
})


/* const grep = spawn('grep', ['ssh'])
grep.stdout.on('data', data => {
	console.log(data.toString())
})
grep.stderr.on('data', error => {
	console.error(`grep stderr: ${error}`);
})
grep.on('close', (code) => {
	if (code !== 0) {
    console.log(`grep process exited with code ${code}`);
  }
}) */