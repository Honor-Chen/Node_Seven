const b1 = Buffer.from('chenlu') // <Buffer 63 68 65 6e 6c 75> 一共有六个字符，每个字符占一位，如：c -- 63  为十六进制
const b2 = Buffer.from([1, 2, 3, 4])
const b3 = Buffer.alloc(20)

// console.log(b1); // <Buffer 63 68 65 6e 6c 75>
// console.log(b2); // <Buffer 01 02 03 04>
// console.log(b3); // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>

// 修改 b2 的 1 位为12
b2.writeInt8(12, 1) // buf.writeInt8(value, offset)
// console.log(b2); // <Buffer 01 0c 03 04>

// BE：大端（<Buffer 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>）
// LE：小端（<Buffer 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>）
b3.writeInt16LE(512, 1) // buf.writeInt16BE(value, offset)，16占据两个字节
// console.log(b3);

// 再次区别一下 __dirname / __filename
console.log(__dirname); // E:\Node_Seven 文件夹
console.log(__filename); // E:\Node_Seven\01_Buffer.js 文件

const fs = require('fs');
const protobuf = require('protocol-buffers');
const schema = protobuf(fs.readFileSync(__dirname + '/01_test.proto', 'utf-8'))
const buf = schema.column.encode({
	name: 'chenlu',
	age: 29,
	price: 999.99
})
console.log("🌐 ~ buf:", buf)

const bufDe = schema.column.decode(buf)
console.log("🌐 ~ bufDe:", bufDe)


// 理解 buf.slice(index) 方法
const buf_slice = Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f])
const sub = buf_slice.slice(2) // <Buffer 6c 6c 6f>
sub[0] = 0x65
// console.log(buf_slice);


// 理解复制一个 Buffer
const newBuf = Buffer.alloc(buf_slice.length)
buf_slice.copy(newBuf)
// console.log('newBuf:', newBuf); // newBuf: <Buffer 68 65 65 6c 6f>
