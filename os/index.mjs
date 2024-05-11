import os from 'node:os';
import {exec} from 'node:child_process';

{
	/* console.log("🌐 ~ os:", os.type()) // Windows_NT
	console.log("🖥 ~ platform:", os.platform()) // win32
	console.log("🗂 ~ homedir:", os.homedir()) // C:\Users\clhon
	console.log("📁 ~ tmpdir:", os.cpus())
	console.log("💾 ~ totalmem:", os.networkInterfaces()) */
	console.log("🖥 ~ release:", os.release()) // 操作系统的版本号
	console.log("🖥 ~ hostname:", os.hostname()) // 计算机的主机名
	console.log("🖥 ~ arch:", os.arch()) // 操作系统的架构 x64
}

{
	/* 根据不同平台，执行不同的命令，打开浏览器 */
	function openBrowser(url) {
		const platform = os.platform();
		if (platform === 'darwin') {
			// macOS
			exec(`open ${url}`);
		} else if (platform === 'win32') {
			// Windows
			exec(`start ${url}`);
		} else {
			// Linux, Unix-like
			exec(`xdg-open ${url}`);
		}
	}

	// openBrowser("https://www.bing.com");
}