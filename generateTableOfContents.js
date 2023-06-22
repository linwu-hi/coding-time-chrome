const fs = require('fs');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

// 扫描 Markdown 文件并生成目录
function generateTableOfContents(filePath) {
  // 读取 Markdown 文件内容
  const markdown = fs.readFileSync(filePath, 'utf8');

  // 创建 Markdown 解析器实例，并添加 markdown-it-anchor 插件
  const md = markdownIt().use(markdownItAnchor);

  // 解析 Markdown 文件内容
  const tokens = md.parse(markdown, {});

  // 存储目录项的数组
  const toc = [];

  // 遍历解析后的 tokens
  for (const token of tokens) {
    if (token.type === 'heading_open' && token.tag.startsWith('h')) {
      // 提取标题级别、标题文本和锚点链接
      const level = parseInt(token.tag.slice(1));
      const text = tokens[tokens.indexOf(token) + 1].content;
      const anchorLink = tokens[tokens.indexOf(token)].attrs.find(attr => attr[0] === 'id')[1];

      // 将目录项添加到数组
      toc.push({ level, text, anchorLink });
    }
  }

  // 打印目录
  for (const item of toc) {
    console.log(`${'  '.repeat(item.level - 1)}- [${item.text}](#${item.anchorLink})`);
  }
}

// 指定要扫描的 Markdown 文件路径
const filePath = './README.md';

// 调用方法生成目录
generateTableOfContents(filePath);
