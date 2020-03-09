module.exports = {
  title: "OpenZeppelin 中文文档",
  description: "OpenZeppelin 中文文档",
  ga: "",
  dest: "./dist/docs",
  base: "/docs/openzeppelin/",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    editLinks: true,
    docsDir: "docs",
    docsBranch: "lbc",
    editLinkText: '帮助完善文档',
    lastUpdated: true,
    search: true,
    searchMaxSuggestions: 10,

    nav: [
      { text: "博客", link: "https://learnblockchain.cn" },
      { text: "区块链文库", link: "https://learnblockchain.cn/site/docs/" },
      { text: "问答", link: "https://learnblockchain.cn/questions" }
    ],
    sidebar: {

      '/cli/': [
        '',
        "start.md",
        "using deps.md",
        "compiling.md",
        "deploy create2.md",
        "publish.md",
        "truffle.md",
        "faq.md",
        {
          title: "API",
          collapsable: true,
          children: [
            "api/commands.md",
            "api/configs.md",
            "api/architure.md",
          ]
        }
      ],

       '/': [
        '',
      ]

    }
  }
};
