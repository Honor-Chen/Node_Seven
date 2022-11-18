const vm = require('node:vm');

const user = {
  name: 'chen',
};
const result = vm.runInNewContext('`<h1>${user.name}</h1>`', { user });
// console.log(result); // <h1>chen</h1>

const templateMap = {
  templateA: '`<h1>${include("templateB")}</h1>`',
  templateB: '`<p>hello world and 模板引擎</p>`', //也可以读取模板文件，将文件名作为 key，内容作为模板
};

const context = {
  include: function (templateName) {
    return templateMap[templateName]();
  },
  _: function (markup) {
    if (!markup) return '';
    return String(markup)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;');
  },
};

Reflect.ownKeys(templateMap).forEach((key) => {
  const temp = templateMap[key];
  // 此时将一个 anonymous 函数赋值给 templateMap[key]，作为属性值
  templateMap[key] = vm.runInNewContext(
    `(function() {
			return ${temp}
		})`,
    context
  );
});

console.log(templateMap['templateA']());

// 测试简单的 XSS 转换
// console.log(vm.runInNewContext('`look: ${_("<scripte></scripte>")}`', context));
