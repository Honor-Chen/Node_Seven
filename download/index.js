const koa = require('koa');
const static = require('koa-static');
const mount = require('koa-mount');
const fs = require('fs');

const app = new koa()

app.use(
	static(__dirname + '/static/')
)
app.use(
	mount('/', async ctx => {
		ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
	})
)

app.listen(3003)