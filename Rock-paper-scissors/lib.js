module.exports = function (playerAction) {
	if(['rock', 'paper', 'scissors'].indexOf(playerAction) === -1) {
		throw new Error('invalid playerAction')
	}

	const random = Math.random() * 3
	let computerAction = ''
	if (random < 1) {
		computerAction = 'rock'
	} else if (random > 2) {
		computerAction = 'scissors'
	} else {
		computerAction = 'paper'
	}

	// console.log('人出了：', playerAction)
	// console.log('计算机出了：', computerAction);

	if(computerAction === playerAction) {
		// console.log('平局');
		return 0
	}

	if (
		(computerAction === 'rock' && playerAction === 'paper') ||
		(computerAction === 'scissors' && playerAction === 'rock') ||
		(computerAction === 'paper' && playerAction === 'scissors')
	) {
		// console.log('人 - 赢了');
		return 1
	} else {
		// console.log('计算机 - 赢了');
		return -1
	}
}