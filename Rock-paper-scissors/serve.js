const qs = require('querystring')
const url = require('url')
const fs = require('fs')
const http = require('http')

const game = require('./lib')
const PORT = 3000

let winNum = 0 // 记录人连续赢的场次
let playerLastAction = null // 记录人最近一次出的类型
let sameNum = 0 // 连续出相同类型的次数

http.createServer((request, response) => {
	// 内置模块 url 解析请求路径
	const parsedUrl = url.parse(request.url)

	// 导航栏小图标请求，直接返回
	if(parsedUrl.pathname === '/favicon.ico') {
		response.writeHead(200)
		response.end()
		return
	}

	// 若是 / 请求，则直接返回页面
	if(parsedUrl.pathname === '/') {
		response.writeHead(200)
		fs.createReadStream(`${__dirname}/index.html`).pipe(response)
	}

	// 游戏
	if(parsedUrl.pathname === '/game') {
		const query = qs.parse(parsedUrl.query)
		const playerAction = query.action
		// console.log('playerAction', playerAction)

		// 若当前次和上次所出类型一致，则 sameNum + 1
		if(playerAction && playerAction === playerLastAction) {
			sameNum++
		} else {
			sameNum = 0
		}

		if(sameNum >= 3) {
			sameNum = 9
			response.writeHead(400)
			response.end('连续 3 次类型相同，退出。。。')
			return
		}

		const gameResult = game(playerAction)

		// 若人连续赢了三局，则退出
		if (winNum >= 3 || sameNum === 9) {
			response.writeHead(500)
			response.end('不玩了，人类太聪明了。。。')
		}

		playerLastAction = playerAction // 当所有校验都通过时，记录上次所出类型。

		if (gameResult === 0) {
			winNum = 0
			response.end('平局')
		} else if(gameResult === 1) {
			winNum++
			response.end('你赢了。。。')
		} else {
			winNum = 0

			response.end('你输了。。。')
		}

		/* response.writeHead(200)
		response.end() */
	}
}).listen(PORT, () => {
	console.log(`serve starting on network: http://127.0.0.1:${PORT}`);
})