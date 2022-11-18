const playerAction = process.argv[process.argv.length - 1]

const game = require('./lib')

// const result = game(playerAction)

// 统计人赢的场数，若赢场大于等于三场，则杀死进程：exit(1)
let count = 0

// 标准输入？？
// e 是Buffer
process.stdin.on('data', e => {
	const temp = e.toString().trim()
	const result = game(temp)

	if (result === 1) {
		count += 1
	}
	if (count >= 3) {
		console.log('不玩了。。。');
		process.exit(1)
	}
})