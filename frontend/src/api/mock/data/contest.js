const list = [
  {
    id: 1,
    title: "Educational Codeforces Round 106 (Rated for Div. 2)",
    start: 1621904400000,
    end: 1621922400000,
    timezone: 8,
    tags: [
      {
        text: "Educational",
        color: "orange"
      }
    ],
    mode: "public"
  },{
    id: 2,
    title: "ICPC Challenge 2021: Marathon (powered by Huawei)",
    start: 1624604400000,
    end: 1624622400000,
    timezone: 8,
    tags: [
      {
        text: "Huawei",
        color: "red"
      }
    ],
    mode: "public"
  },{
    id: 3,
    title: "Kotlin Heroes: Episode 7",
    start: 1621933200000,
    end: 1623315600000,
    timezone: 8,
    tags: [
      {
        text: "Kotlin",
        color: "primary"
      }
    ],
    mode: "private"
  },{
    id: 4,
    title: "Codeforces Deltix Round Spring 2021 [Div.1 + Div.2]",
    start: 1620637200000,
    end: 1620723600000,
    timezone: 8,
    tags: [
      {
        text: "Deltix",
        color: "blue"
      }
    ],
    mode: "public"
  },
];

const details = [
  {
    id: 1,
    title: "Educational Codeforces Round 106 (Rated for Div. 2)",
    start: 1621904400000,
    end: 1621922400000,
    timezone: 8,
    description: "This contest is held by QLUT ICPC Club. Sponsored by DBrand.",
    type: 1,    // 0 - OI, 1 - ICPC
    problems: [
      {
        id: 1,
        code: "A",
        status: 8,  // 0 default, 1 security check, 2 CE, 3 RE, 4 TLE, 5 MLE, 6 OLE, 7 PE, 8 WA, 9 AC, from join user table
        name: "Domino on Windowsill",
      }, {
        id: 2,
        code: "B",
        status: 9,
        name: "Binary Removals"
      }, {
        id: 3,
        code: "C",
        status: 4,
        name: "The Number of Pairs"
      }, {
        id: 4,
        code: "D",
        status: 0,
        name: "Chaotic Merge"
      }
    ],
    tags: [
      {
        text: "Educational",
        color: "orange"
      }
    ],
    mode: "public"
  },{
    id: 2,
    title: "ICPC Challenge 2021: Marathon (powered by Huawei)",
    start: 1624604400000,
    end: 1624622400000,
    timezone: 8,
    description: "This contest is held by Huawei.",
    type: 0,
    problems: [
      {
        id: 1, 
        code: "A",
        status: 9,
        name: "删除链表的倒数第 N 个结点",
      }, {
        id: 2, 
        code: "B",
        status: 9,
        name: "游乐园的游览计划"
      },{
        id: 3, 
        code: "C",
        status: 8,
        name: "反转二叉树"
      }
    ],
    tags: [
      {
        text: "Huawei",
        color: "red"
      }
    ],
    mode: "public"
  },{
    id: 3,
    title: "Kotlin Heroes: Episode 7",
    start: 1621933200000,
    end: 1623315600000,
    timezone: 8,
    description: "This contest is held by Huawei.",
    type: 0,
    tags: [
      {
        text: "Kotlin",
        color: "primary"
      }
    ],
    problems: [
      {
        id: 1, 
        code: "A",
        status: 9,
        name: "删除链表的倒数第 N 个结点",
      }, {
        id: 2, 
        code: "B",
        status: 9,
        name: "游乐园的游览计划"
      },{
        id: 3, 
        code: "C",
        status: 8,
        name: "反转二叉树"
      }
    ],
    mode: "private"
  },{
    id: 4,
    title: "Codeforces Deltix Round Spring 2021 [Div.1 + Div.2]",
    start: 1620637200000,
    end: 1620723600000,
    timezone: 8,
    tags: [
      {
        text: "Deltix",
        color: "blue"
      }
    ],
    mode: "public"
  },
];

// 榜单信息
const rank = [
  {
    id: 1,                  // 比赛id
    list: [
      {
        rank: 1,            // 名词
        user: {             // 用户信息
          id: 1,
          username: "treenity",
          nickname: "Treenity",
          role: "user",
        },
        score: {
          count: 4,
          time: 618
        },
        results: [          // 提交题解的判题信息
          {
            problemId:1,    // 解答题目
            result: 9,      // 判题结果
            try: 1,         // 第几次尝试
            time: 170,       // 成功题解的时间
            fb: true,      // 一血
          }, {
            problemId: 2,
            result: 9,
            try: 1,
            time: 103,
            fb: false,
          }, {
            problemId: 3,
            result: 9,
            try: 2,
            time: 56,
            fb: true,
          }, {
            problemId: 4,
            result: 9,
            try: 3,
            time: 289,
            fb: true
          }
        ]
      },
      {
        rank: 2,
        user: {
          id: 3,
          username: "lospatrons",
          nickname: "Los Patrons",
          role: "user",
        },
        score: {
          count: 3,
          time: 340
        },
        results: [
          {
            problemId:1,
            result: 9,
            try: 2,
            time: 217,
            fb: false,
          }, {
            problemId: 2,
            result: 9,
            try: 1,
            time: 38,
            fb: true,
          }, {
            problemId: 3,
            result: 9,
            try: 2,
            time: 85,
            fb: false,
          }, {
            problemId: 4,
            result: 8,
            try: 1,
            time: 0,
            fb: false
          }
        ]
      },
      {
        rank: 3,
        user: {
          id: 4,
          username: "cyclecover",
          nickname: "Double Cycle Cover",
          role: "user",
        },
        score: {
          count: 3,
          time: 544
        },
        results: [
          {
            problemId:1,
            result: 9,
            try: 1,
            time: 267,
            fb: false,
          }, {
            problemId: 2,
            result: 9,
            try: 1,
            time: 63,
            fb: false,
          }, {
            problemId: 3,
            result: 9,
            try: 1,
            time: 214,
            fb: false,
          }, {
            problemId: 4,
            result: 0,
            try: 0,
            time: 0,
            fb: false
          }
        ]
      },
      {
        rank: 4,
        user: {
          id: 5,
          username: "triniceratops",
          nickname: "Triniceratops",
          role: "user",
        },
        score: {
          count: 3,
          time: 610
        },
        results: [
          {
            problemId:1,
            result: 9,
            try: 1,
            time: 217,
            fb: false,
          }, {
            problemId: 2,
            result: 9,
            try: 1,
            time: 180,
            fb: false,
          }, {
            problemId: 3,
            result: 9,
            try: 1,
            time: 213,
            fb: false,
          }, {
            problemId: 4,
            result: 8,
            try: 1,
            time: 0,
            fb: false
          }
        ]
      }
    ]
  }
]

export {
  list,
  details,
  rank
}