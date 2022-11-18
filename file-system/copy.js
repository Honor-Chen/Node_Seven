const fs = require('fs');
const path = require('path');

function copy(dst, src) {
	fs.writeFileSync(dst, fs.readFileSync(src))
}

function main() {
	const { argv } = process
	// console.log('argv', argv)
	/* 
		argv [
			'D:\\Program Files\\nodejs\\node.exe',
			'E:\\Node_Seven\\file-system\\copy.js'
		]
	*/
	copy(argv[0], argv[1])
}

// main(process.argv.slice(2))

/* 简单eg：copy copy.txt 文件到当前目录下 */
function copyTxt() {
	const dirFile = path.dirname(process.argv[1])
	const sourceFile = path.resolve(dirFile, './copy.txt')
	const targetFile = path.resolve(dirFile, './newCopy.txt')
	copy(targetFile, sourceFile)
}
// copyTxt()


/* 模拟大文件拷贝（stream: 数据流） */
function largeCopy() {
	const dirFile = path.dirname(process.argv[1])
	const sourceFile = path.resolve(dirFile, './test.pdf')
	const targetFile = path.resolve(dirFile, './testNew.pdf')
	
	const rs = fs.createReadStream(sourceFile)
	const ws = fs.createWriteStream(targetFile)
	
	rs.on('data', function(chunk) {
		if(ws.write(chunk) === false) { // 判断传入的数据是否写入到目标文件中了
			// console.log(1);
			rs.pause()
		}
	})
	rs.on('end', function() {
		// console.log(2);
		ws.end()
	})
	ws.on('drain', function() { // 当写入数据流的数据已经将缓存中的数据写入目标，则继续读流
		// console.log(3);
		rs.resume()
	})
}
// largeCopy()


/* 同步遍历目录：遍历算法（深度优先 + 先序遍历） */
function travel(dir, callback) {
	fs.readdirSync(dir).forEach(function(file) {
		const pathName = path.join(dir, file)
		if(fs.statSync(pathName).isDirectory()) { // fs.statSync(pathName) 提供文件有关的信息
			travel(pathName, callback)
		} else {
			callback(pathName)
		}
	})
}
// travel('/Node_Seven/file-system', function(pathName) {
// 	console.log(pathName);
// })



/* 文件编码 */
function readTxt(pathname) {
	// Unicode: UTF8 (EF,BB,BF)
	const content = fs.readFileSync(pathname) // 返回的是 Buffer 缓冲区

	if(content[0] === 0xEF && content[1] === 0xBB && content[2] === 0xBF) {
		content = content.slice(3)
	}

	return content.toString('utf-8')
}
// console.log(readTxt(path.join(__dirname, '/copy.txt')));

// console.log(fs.readFileSync(path.join(__dirname, '/copy.txt'), { encoding: 'utf8' }));



/* 
	单字节编码？？？

	binary:二级制
*/
function replace(pathname) {
	let content = fs.readFileSync(pathname, 'binary')
	// console.log(content); // 此时获取的是乱码
	content = content.replace('copy', 'modify copy')
	fs.writeFileSync(pathname, content, 'binary')
}
// replace(path.join(__dirname, 'copy.txt'))
