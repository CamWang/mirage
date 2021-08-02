const role = {
  list: ["default", "balloon", "teacher", "jury", "admin"],
  default: ["default"]
};

const country = {
  {
    name: "China",    // UN的会员国英文页面国家名称，区分大小写，包括空格和括号内文字等https://www.un.org/en/about-us/member-states
    short: "CHN",     // 三位字母简写，https://www.iban.com/country-codes
    icon: "china",    // 图标名称，在国旗图标包内
  }
}

module.exports = {
  role
}