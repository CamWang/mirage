const list = [
  {
    id: 1,
    title: "Comparing the New Generation of Build Tools",
    author: "Hugh Haworth",
    tags: [
      {
        text: "CSS",
        color: "orange",
      },
    ],
    time: 1621928522000
  },{
    id: 2,
    title: "CSS is a Strongly Typed Language",
    author: "Eric Bailey",
    tags: [
      {
        text: "CSS",
        color: "orange",
      }
    ],
    time: 1621842122000
  },{
    id: 3,
    title: "The Importance of Career Laddering",
    author: "Hugh Haworth",
    tags: [
      {
        text: "Career",
        color: "green",
      }
    ],
    time: 1621921292000
  },{
    id: 4,
    title: "Wrangling Control Over PDFs with the Adobe PDF Embed API",
    author: "Raymond Camden",
    tags: [
      {
        text: "Adobe",
        color: "red",
      },
      {
        text: "Frontend",
        color: "primary",
      }
    ],
    time: 1621992199000
  },{
    id: 5,
    title: "Can We Create a “Resize Hack” With Container Queries?",
    author: "Jhey Tompkins",
    tags: [
      {
        text: "Container",
        color: "cyan",
      }
    ],
    time: 1621928522000
  },{
    id: 6,
    title: "Notion API",
    author: "Chris Coyier",
    tags: [
      {
        text: "API",
        color: "red",
      }
    ],
    time: 1621599088000
  },
];

const details = [
  {
    id: 1,
    title: "Comparing the New Generation of Build Tools",
    user: {
      id: 1,
      nickname: "Admin",
      avatar: "static/avatars/avatar1.svg"
    },
    tags: [
      {
        text: "CSS",
        color: "orange",
      },
    ],
    time: 1621928522000,
    replies: [
      {
        id: 1,
        user: {
          id: 1,
          nickname: "lr1d",
        },
        content: "OI Wiki已经迁到已经迁移至新的域名啦！ 围观地址：https://oi-wiki.org",
        time: 1621928622000,
      }, {
        id: 2,
        user: {
          id: 2,
          nickname: "liyifeng",
        },
        content: "前排资瓷！",
        time: 1621928722000,
      }, {
        id: 3,
        user: {
          id: 3,
          nickname: "HYK",
        },
        content: "前排资瓷！",
        time: 1621928922000,
      }, {
        id: 4,
        user: {
          id: 4,
          nickname: "ZCDHJ",
        },
        content: "资瓷！",
        time: 1621929122000,
      }
    ],
    content: `
A bunch of new developer tools have landed in the past year and they are biting at the heels of the tools that have dominated front-end development over the last few years, including webpack, Babel, Rollup, Parcel, create-react-app.

These new tools aren’t designed to perform the exact same function, and each has different things they’re trying to achieve and features to get there. Despite their differences, these tools do share a common goal: improve the developer experience.

Specifically, I’d like to evaluate each one, outlining what they do, why we need them, and their use cases. I realize that comparisons aren’t always fair. Again, it’s not like any of the things we’re looking at in this article are direct competitors. In fact, Snowpack and Vite actually use esbuild under the hood for certain tasks. Our goal is more to get a better view of the landscape of developer tools that run tasks to make our jobs easier. This way, we see what options are out there and how they stack up, so we can make the best choices when we need them.

Of course, all of this will be colored by my experience using React and Preact. I’m more familiar with these frameworks libraries, but we’ll look at their support for other front-end frameworks too.

There have been a whole lot of great articles, streams, and podcasts about these new developer tools. There are a couple of ShopTalk Show episodes I’d recommend for more context: Episode 454 discusses Vite and Episode 448 features the creators of wmr and Snowpack. Something that stands out from these episodes is that a huge amount of work has gone into building these tools to modernize our developer environments.`
  },{
    id: 2,
    title: "CSS is a Strongly Typed Language",
    tags: [
      {
        text: "CSS",
        color: "orange",
      }
    ],
    user: {
      id: 1,
      nickname: "Cam",
      avatar: "static/avatars/avatar2.svg"
    },
    time: 1621842122000,
    replies: [
      {
        id: 1,
        user: {
          id: 1,
          nickname: "OwenOwl",
        },
        content: "前排资瓷",
        time: 1621842122000,
      }, {
        id: 2,
        user: {
          id: 2,
          nickname: "mmh",
        },
        content: "前排资瓷！",
      }, {
        id: 3,
        user: {
          id: 3,
          nickname: "WAAutoMaton",
        },
        content: "前排资瓷！",
      }, {
        id: 4,
        user: {
          id: 4,
          nickname: "chenyanbo",
        },
        content: "资瓷！"
      }
    ],
    content:`
One of the ways you can classify a programming language is by how strongly or weakly typed it is. Here, “typed” means if variables are known at compile time. An example of this would be a scenario where an integer (1) is added to a string containing an integer ("1"):

\`\`\`
result = 1 + "1";
\`\`\`

The string containing an integer could have been unintentionally generated from a complicated suite of logic with lots of moving parts. It could also have been intentionally generated from a single source of truth.

Despite the connotations that the terms “weak” and “strong” imply, a strongly-typed programming language isn’t necessarily better than a weakly-typed one. There may be scenarios where flexibility is needed more than rigidity, and vice-versa. As with many aspects of programming, the answer is dependent on multiple external contexts (i.e “it depends”).

The other interesting bit is there is no formal definition of what constitutes strong or weak typing. This means that perceptions of what is considered a strongly or weakly-typed language differ from person to person, and may change over time.

## TypeScript

JavaScript is considered a weakly-typed language, and this flexibility contributed to its early adoption on the web. However, as the web has matured and industrialized, use cases for JavaScript have become more complicated.

Extensions like TypeScript were created to help with this. Think of it as a “plugin” for JavaScript, which grafts strong typing onto the language. This helps programmers navigate complicated setups. An example of this could be a data-intensive single page application used for e-commerce.

TypeScript is currently very popular in the web development industry, and many new projects default to using TypeScript when first setting things up.

## Compile time

Compile time is the moment when a programming language is converted into machine code. It is a precursor to runtime, the moment when machine code is performed by the computer.

As with many things on the web, compile time is a bit tricky. A setup that utilizes TypeScript will stitch together component pieces of JavaScript code and compile them into a single JavaScript file for the browser to read and run.

The time when component pieces compile is when they are all combined. TypeScript serves as a kind of overseer, and will yell at you if you try to break the typed conventions you have set up for yourself before combination occurs.
    `
  },{
    id: 3,
    title: "The Importance of Career Laddering",
    user: {
      id: 1,
      nickname: "Herminone",
      avatar: "static/avatars/avatar3.svg"
    },
    tags: [
      {
        text: "Career",
        color: "green",
      }
    ],
    replies: [
      {
        id: 1,
        user: {
          id: 1,
          nickname: "D.ark",
        },
        content: "前排资瓷",
        time: 1621842122000,
      }
    ],
    time: 1621921292000,
    content: `
The title of this article is misleading. It’s not actually very important for an Engineering Manager to use career laddering, per se, or my process. It is, however, very important that an Engineering Manager is clear with their employees about what their expectations and direction, not to mention where they are in terms of a raise and promotion.

I’ve personally found that career laddering can help with this, but is only one small supportive piece of a whole. You can have formalized career laddering in place and still mislead your staff, so it’s critical that career laddering docs are just one tool embedded in a deeper process.

Before we dive any further, let’s clarify first what we mean by a career ladder. Career laddering is typically a system used to show what expectations are at different levels of a role, a purpose of which is defining how one might be promoted. This can have different forms, but tends to be an internal document that states the expectations of a staff member at any given stage of their career.

[Here is a microsite where I open sourced all of my career ladders](https://career-ladders.dev/)

As you can see in the site, it outlines each of the different levels of the job, as well as the roles and responsibilities expected at that level. In this particular example, there is a basic concept that ties the whole thing together:

* To get to Senior, you’re the best “you” you can be — you perform your role exceedingly well and you’ve reached a high potential for your own output.
* To get to Staff, your focus is really to expand beyond yourself. You start teaching people the great things you learned and help serve their needs.
* To get to Principal, you’re creating systems that scale beyond yourself. You’re no longer helping folks be like you — you’re helping them where they are. A lot of your activities are enabling the success of everyone around you.

What I like about this system is that the job of the most advanced folks becomes helping support and grow other people or system in such a way that benefits everyone. Principal-level folks don’t lord knowledge over others; they work to put the knowledge into practice in a way that’s truly helpful.

Again, it’s not important that you use my exact system, but I want to show that having clarity about the roles and expectations of each team member can really go a long way. Why? Let’s dive in.
`
  }
];

const tags = [
  {
    text: "CSS",
    color: "orange",
  },{
    text: "Career",
    color: "green",
  },{
    text: "Adobe",
    color: "red",
  },
  {
    text: "Frontend",
    color: "primary",
  },{
    text: "Container",
    color: "cyan",
  },{
    text: "API",
    color: "red",
  }
]

export {
  list,
  details,
  tags
};
