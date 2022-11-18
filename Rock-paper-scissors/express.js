/* 
	! express 注意点，express 中间件（洋葱圈）模型存在一点的问题。
	注意点：next() 的执行时机。
	可将逻辑封装，提取到一个文件中，然后，通过洋葱圈模型引入执行。方便后期维护。
*/

const fs = require('fs')
const http = require('http')
const game = require('./lib')
const PORT = 3000

const app = require('express')()

let winNum = 0 // 记录人连续赢的场次，赢了 3 局之后就不玩了
let playerLastAction = null // 记录人最近一次出的类型
let sameNum = 0 // 连续出相同类型的次数

app.get('/favicon.ico', (_, response) => {
	response.status(200)
})

app.get('/', (_, response) => {
	// !：此处需要注意，读取的文件默认格式是 Buffer 类型，需指定转换为何种类型，如下：utf-8
	const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
	response.status(200).send(html)

	/* response.writeHead(200)
	fs.createReadStream(`${__dirname}/index.html`).pipe(response) */
})

// 如下的打印顺序：1,2,3,3.1,2.1,1.1
app.get('/game', (request, response, next) => {
	// 若人连续赢了三局，则退出
	if (winNum >= 3 || sameNum === 9) {
		response.status(500).send('不玩了，人类太聪明了。。。').end()
		return
	}

	// console.log(1);
	next()

	if(response.playerWin) {
		winNum++
	}
	// console.log(1.1);
}, (request, response, next) => {
	// 在 express 中可直接读取 request 中的查询参数项
	const { action: playerAction } = request.query

	// 若当前次和上次所出类型一致，则 sameNum + 1
	if(playerAction && playerAction === playerLastAction) {
		sameNum++
	} else {
		sameNum = 0
	}

	if(sameNum >= 3) {
		sameNum = 9
		response.status(400).send('连续 3 次类型相同，退出。。。')
		return
	}
	// console.log(2);

	// !：可将playerAction 挂载到 response 上，然后调用 next() ，进行下一个代码块的执行
	response.playerAction = playerAction
	next()
	// console.log(2.1);
}, (request, response) => {
	// console.log(3);
	const playerAction = response.playerAction

	const gameResult = game(playerAction)

	playerLastAction = playerAction // 当所有校验都通过时，记录上次所出类型。

	/* 
		模拟异步状态，此时的连赢 3 局的判断逻辑就不起作用了，because，此时的 setTimeout 宏任务需等到所有的洋葱圈来回执行完成后，再执行。
		1
		2
		3
		3.1
		2.1
		1.1
		setTimeout...
	*/
	setTimeout(() => {
		// console.log('setTimeout...');
		response.status(200)
		if (gameResult === 0) {
			response.end('平局')
		} else if(gameResult === 1) {
			// 标识出玩家赢了
			response.playerWin = true
			response.end('你赢了。。。')
		} else {
			response.end('你输了。。。')
		}
	}, 500);
	// console.log(3.1);
})

app.listen(PORT, () => {
	console.log(`serve starting on network: http://127.0.0.1:${PORT}`);
})