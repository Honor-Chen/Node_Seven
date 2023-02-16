/* 
	本文件整理 NodeJS 中常用的工具方法

	come on....
*/
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, statSync, existsSync, stat } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/*
	!获取根目录 | 根目录文件下的 *
	eg:
		ROOT('package.json') // E:\Node_Seven\package.json
*/
export const ROOT = (...args) => resolve.apply(null, [__dirname, './'].concat(args ? args : []))

/*
	!获取 src | src 文件 *
	eg：
		SRC('pages')：获取 src/pages 文件夹绝对路径
*/
export const SRC = (...args) => resolve.apply(null, [__dirname, './', 'src']).concat(args ? args : [])

/*
	!获取指定文件夹下一级目录
	eg：
		getDirectory('node_modules')：[
			{ cur: '.bin', item: 'node_modules\\.bin' },
			...
		]
*/
export const getDirectory = (base) =>
    readdirSync(base).reduce((prev, cur) => {
        const item = join(base, cur)
        const stat = statSync(item)
        return stat.isDirectory() && prev.push({ cur, item }), prev // !：注意：一行解决返回值问题
    }, [])

/*
	!获取指定文件夹下一级目录 | 文件
	eg：
		getFileOfFilter('node_modules', (file) => file.match(/\.+/g))：[
			'node_modules\\.bin',
			...
		]
*/
export const getFileOfFilter = (filePath, fileFilter) => {
    if (!existsSync(filePath)) return null

    return readdirSync(filePath)
        .filter(fileFilter || (() => true))
        .map((file) => join(filePath, file))
}

/*
	!key 和 value 相互转换
 */
export const changeKeyValue = () => {
    const loaders = {
        json: ['.json', '.geojson'],
        file: ['.png', '.jpg', '.webp'],
    }
    return Object.entries(loaders).reduce((prev, [type, exts]) => Object.assign(prev, ...exts.map((ext) => ({ [ext]: type }))), {})
}

/*
	!别名插件中的查找文件的方法
 */
export const detectFile = async (importPath) => {
    try {
        const stats = await stat(importPath)
        if (stats.isDirectory()) {
            return join(importPath, 'index.js')
        }
        return importPath
    } catch (ex) {
        return `${importPath}.js`
    }
}

/*
	!将文件名称 test-demo 改为 TestDemo 大驼峰命名法
 */
export const camelCaseString = (str = '') => {
    if (str.includes('-')) {
        let tempStr = str.toLowerCase().split('-')

        for (let i = 0; i < tempStr.length; i++) {
            tempStr[i] = tempStr[i].substring(0, 1).toUpperCase() + tempStr[i].substring(1)
        }
        return tempStr.join('')
    }
    return str
}

console.log(camelCaseString('color-demo'))
