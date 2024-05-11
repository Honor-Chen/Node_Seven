import {arch, argv, cwd, memoryUsage, env} from 'node:process'
{
	// 编译 Node.js 二进制文件的操作系统 CPU 架构。 可能的值为：'arm', 'arm64', 'ia32', 'loong64', 'mips','mipsel', 'ppc', 'ppc64', 'riscv64', 's390', 's390x'， 和'x64'.
	console.log("🌐 ~ arch:", arch)
}

{
	// 编译 Node.js 二进制文件的当前工作目录。
	console.log("🌐 ~ cwd:", cwd())
}

{
	// 编译 Node.js 二进制文件的环境变量，以数组形式返回，第一项是 Node.js 二进制文件的路径，第二项是 Node.js 二进制文件的工作目录，第三项开始往后参数为 Node.js 二进制文件运行时传入的命令行参数。
	console.log("🌐 ~ argv:", argv)
}

{
	// 获取当前进程内存使用情况
	console.log("🌐 ~ memoryUsage:", memoryUsage())
}

/* {
	setTimeout(() => {
		process.exit(0);
	}, 2000);
	setTimeout(() => {
		console.log('5000ms后退出');
	}, 5000);

	process.on('exit', (code) => {
		console.log(`进程已退出，退出码：${code}`);
	});
} */

/* {
	console.log(process.pid + '进程已终止');
	process.kill(process.pid, 'SIGTERM');
} */

{
	// 查询操作系统中所有的环境变量，也可修改、查询此进程中的环境变量（PS：修改的环境变量仅对当前线程有效，不会影响操作系统的环境变量，线程结束便释放）。
	// console.log("🌐 ~ env:", env)
}

{
	// cross-env 是跨平台设置、使用环境变量。Windows 下可使用 set 或者 setx 命令设置环境变量，Linux 下可使用 export 命令设置环境变量。
}
