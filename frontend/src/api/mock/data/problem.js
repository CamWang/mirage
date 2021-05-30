const problems = [
  {
    id: 1,
    title: "A + B 问题",
    author: "admin",
    timelimit: 500,
    memorylimit: 10,
    type: "",
    tags: [
      {
        text: "Special Judge",
        color: "primary",
      },
      {
        text: "基础",
        color: "green"
      }
    ],
    submit: 21683,
    success: 11482,
  },{
    id: 2,
    title: "你好，世界！",
    author: "admin",
    timelimit: 1000,
    memorylimit: 15,
    type: "",
    tags: [
      {
        text: "字符串",
        color: "cyan",
      },{
        text: "模板",
        color: "secondary",
      },
      {
        text: "基础",
        color: "green"
      }
    ],
    submit: 16823,
    success: 8382
  },{
    id: 3,
    title: "回文字串",
    author: "admin",
    timelimit: 500,
    memorylimit: 10,
    type: "",
    tags: [
      {
        text: "字符串",
        color: "cyan",
      },
      {
        text: "基础",
        color: "green"
      }
    ],
    submit: 12845,
    success: 4586
  },{
    id: 4,
    title: "冒泡排序",
    author: "admin",
    timelimit: 500,
    memorylimit: 10,
    type: "",
    tags: [
      {
        text: "算法",
        color: "orange",
      },
      {
        text: "基础",
        color: "green"
      }
    ],
    submit: 10283,
    success: 4894
  },{
    id: 5,
    title: "矩阵乘法",
    author: "admin",
    timelimit: 500,
    memorylimit: 10,
    type: "",
    tags: [
      {
        text: "数学",
        color: "pink",
      },
      {
        text: "基础",
        color: "green"
      }
    ],
    submit: 8474,
    success: 4828
  },{
    id: 6,
    title: "平衡二叉树",
    author: "admin",
    timelimit: 500,
    memorylimit: 10,
    type: "",
    tags: [
      {
        text: "树结构",
        color: "green",
      },
      {
        text: "数据结构",
        color: "indigo accent-4"
      }
    ],
    submit: 7984,
    success: 3482
  },{
    id: 7,
    title: "最小生成树",
    author: "admin",
    timelimit: 500,
    memorylimit: 10,
    type: "",
    tags: [
      {
        text: "树结构",
        color: "green",
      },
      {
        text: "中等",
        color: "deep-purple darken-3"
      }
    ],
    submit: 6858,
    success: 3281
  },
];

const details = [
  {
    id: 1,
    title: "A + B 问题",
    author: "admin",
    timelimit: 500,
    memorylimit: 10,
    type: "",
    tags: [
      {
        text: "Special Judge",
        color: "primary",
      },
      {
        text: "基础",
        color: "green"
      }
    ],
    submit: 21683,
    success: 11482,
    spj: "",
    content: `
## 题目描述
输入$a$和$b$，输出$a+b$的结果。
## 输入格式
一行两个正整数$a$和$b$。
## 输出格式  
一行一个正整数$a+b$。
## 样例
输入
\`\`\`
12
\`\`\`
输出
\`\`\`
3
\`\`\`
## 数据范围
对于$100%$的数据，$1<=a$, $b<=10^6$`,
  }, {
    id: 2,
    title: "你好，世界！",
    author: "admin",
    timelimit: 1000,
    memorylimit: 15,
    type: "",
    tags: [
      {
        text: "字符串",
        color: "cyan",
      },{
        text: "模板",
        color: "secondary",
      },
      {
        text: "基础",
        color: "green"
      }
    ],
    submit: 16823,
    success: 8382,
    spj: "",
    content: `
## 题目描述
输出“Hello, World!”。
## 样例
输入
\`\`\`
\`\`\`
输出
\`\`\`
Hello, World!
\`\`\``
  }, {
    id: 3,
    title: "回文字串",
    author: "admin",
    timelimit: 500,
    memorylimit: 10,
    type: "",
    tags: [
      {
        text: "字符串",
        color: "cyan",
      },
      {
        text: "基础",
        color: "green"
      }
    ],
    submit: 12845,
    success: 4586,
    spj: "",
    content: `
## 题目描述
输入一个字符串，输出数字1代表此字串为回文字串，输出0代表该字串不是回文字串
## 样例1
输入
\`\`\`
tenet
\`\`\`
输出
\`\`\`
1
\`\`\`
## 样例2
输入
\`\`\`
hello
\`\`\`
输出
\`\`\`
0
\`\`\``,
  }
];

export {
  problems,
  details
};