/* 
	! koa 注意点，koa 中间件（洋葱圈）模型存在一点的问题。
	注意点：app.use(mount('/')) 时的代码位置，必须放在 /game 的后边，若在 game 前边，会提前匹配到。
	可将逻辑封装，提取到一个文件中，然后，通过洋葱圈模型引入执行。方便后期维护。
*/

const fs = require('fs')
const http = require('http')
const game = require('./lib')
const Koa = require('koa');
const mount = require('koa-mount')

const PORT = 3000

const app = new Koa()

let winNum = 0 // 记录人连续赢的场次，赢了 3 局之后就不玩了
let playerLastAction = null // 记录人最近一次出的类型
let sameNum = 0 // 连续出相同类型的次数

function resetVar() {
	sameNum = winNum = 0
	playerLastAction = null
}

app.use(
	mount('/favicon.ico', (ctx) => {
		ctx.status = 200
	})
)

const gameKoa = new Koa()
app.use(
	mount('/game', gameKoa)
)
gameKoa.use(
	async (ctx, next) => {
		// 若人连续赢了三局，则退出
		if (winNum >= 3 || sameNum === 9) {
			ctx.status = 500
			ctx.body = '不玩了，人类太聪明了。。。'
			return
		}
	
		console.log(1);
		await next()
	
		if(ctx.playerWin) {
			winNum++
		}
		console.log(1.1);
	}
)

gameKoa.use(
	async (ctx, next) => {
		// 在 express 中可直接读取 request 中的查询参数项
		const { action: playerAction } = ctx.query
	
		// 若当前次和上次所出类型一致，则 sameNum + 1
		if(playerAction && playerAction === playerLastAction) {
			sameNum++
		} else {
			sameNum = 0
		}
	
		if(sameNum >= 3) {
			sameNum = 9
			ctx.status = 400
			ctx.body = '连续 3 次类型相同，退出。。。'
			return
		}
		console.log(2);
	
		// !：可将playerAction 挂载到 ctx 上，然后调用 next() ，进行下一个代码块的执行
		ctx.playerAction = playerAction
		await next()
		console.log(2.1);
	}
)

gameKoa.use(
	async (ctx, next) => {
		console.log(3);
		const playerAction = ctx.playerAction
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
		await new Promise((resolve) => {
			setTimeout(() => {
				ctx.status = 200
				console.log('setTimeout...');
				if (gameResult === 0) {
					ctx.body = '平局'
				} else if(gameResult === 1) {
					// 标识出玩家赢了
					ctx.playerWin = true
					ctx.body = '你赢了。。。'
				} else {
					ctx.body = '你输了。。。'
				}
				resolve()
			}, 500);
		})
		console.log(3.1);
	}
)

app.use(
	mount('/',
	(ctx) => {
		// !：此处需要注意，读取的文件默认格式是 Buffer 类型，需指定转换为何种类型，如下：utf-8
		const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
		ctx.body = html

		resetVar()
	})
)

app.listen(PORT, () => {
	console.log(`serve starting on network: http://127.0.0.1:${PORT}`);
})