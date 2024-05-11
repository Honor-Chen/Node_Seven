const path = require('path')

console.log(__dirname)
console.log(__filename)
console.log(process.cwd())
console.log(path.resolve('./'))

console.log(path.dirname(__filename))

console.log(path.resolve())

// 在 path 目录下运行 node sub_path/path.js
/*
	E:\Node_Seven\path\sub_path
	E:\Node_Seven\path\sub_path\path.js
	E:\Node_Seven\path
	E:\Node_Seven\path
	E:\Node_Seven\path\sub_path
	E:\Node_Seven\path
*/

console.log('解析 path.resolve([...paths]) ::>>', path.resolve('/foo/bar', '/bar/faa', '../', 'a/../c'));
/* 解析：
	1: cd /foo/bar 进入 foo/bar 目录，现在处于 /foo/bar 目录
	2: cd /bar/faa ，与第一步区别是，也是以 / 开头的，也就是根目录，所以进入 /bar/faa 目录
	3: cd ../ 现在处于 /bar 目录
	4: cd a/../c ，注意此处是以 a/ 开头的，所以先进入 a 目录，然后再退到 /bar 目录，最后进入 /c 目录，所以处于 /bar/c 目录
	返回结果：/bar/c
*/

exports.A = 1
