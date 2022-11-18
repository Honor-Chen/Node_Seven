const EventEmitter = require('events').EventEmitter;

class MyEvent extends EventEmitter {
	constructor() {
		super()
		setInterval(() => {
			this.emit('newLesson', { price: Math.random() * 100 })
		}, 3000)
	}
}

const lesson = new MyEvent
lesson.on('newLesson', ({ price }) => {
	console.log(price);
})