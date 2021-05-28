const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    email: "admin@mirage.com",
    nickname: "Admin",
    avatar: "static/avatar.svg",
    school: 1,
    class: "软工17-3",
    role: "admin",
    theme: "dark",
    problem: [1, 2, 3, 4, 5],   // for record
    contest: [1, 2, 3, 4],      // for private filter
    messages: [1, 2, 3, 4, 5, 6]
  }, {
    id: 2,
    username: "cam",
    password: "cam",
    email: "cam@mirage.com",
    nickname: "Cam",
    avatar: "static/avatar.svg",
    school: 1,
    class: "软工17-3",
    role: "teacher",
    theme: "light",
    problem: [1, 2],   // for record
    contest: [3, 4],   // for private filter
    messages: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11],
  }, {
    id: 2,
    username: "cam",
    password: "cam",
    email: "cam@mirage.com",
    nickname: "Cam",
    avatar: "static/avatar.svg",
    school: 1,
    class: "软工17-3",
    role: "teacher",
    theme: "light",
    problem: [1, 2],   // for record
    contest: [4],      // for private filter
    messages: [6, 7, 8, 9, 10, 11],
  }
];

export default users;