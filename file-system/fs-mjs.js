import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { readFile, open, readdir, opendir } from 'node:fs/promises'

// 获取 __filename 的 ESM 写法
const __filename = fileURLToPath(import.meta.url)
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))


async function onReadFileSync(filePath) {
	try {
		const syncData = await readFile(filePath, 'utf8');
		console.log('--> Reading file synchronously:', syncData);
		return syncData;
	} catch (error) {
		console.error(error)
	}
}
// console.log(onReadFileSync(join(__dirname, 'copy.txt')));

async function onOpenFile(filePath) {
	try {
		const fileHandle = await open(filePath, 'r')
		for await(const chunk of fileHandle.readLines()) {
			console.log(typeof chunk.toString())
		}
	} catch (error) {
	}
}
// onOpenFile(join(__dirname, 'copy.txt'))


/**
 * @description: 获取指定目录下的所有文件路径
 * @param {*} dirPath
 * @param {*} arrayOfFiles
 * @return {*}
 */
async function getAllFiles(dirPath, arrayOfFiles) {
	try {
		const files = await readdir(dirPath, { withFileTypes: true });
		arrayOfFiles = arrayOfFiles || [];

		files.forEach(file => {
			if (file.isDirectory()) {
				arrayOfFiles = getAllFiles(resolve(dirPath, file.name), arrayOfFiles);
			} else {
				arrayOfFiles.push(resolve(dirPath, file.name));
			}
		})

		return arrayOfFiles;
	} catch (error) {
	}
}
// getAllFiles('../download').then(files => console.log(files))
opendir('../download', {recursive: true}).then(async dir => {
	for await (const dirent of dir) {
		console.log("🌐 ~ forawait ~ dirent:", dirent)
		console.log(dirent.name)
	}
})