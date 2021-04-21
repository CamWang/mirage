#include "task.h"

Task::Task() {}

Task::Task(const uint32_t i, const uint32_t p, const vector<string> d, const uint8_t l, const uint8_t t, const string s, const string c) {
  id = i;
  pid = p;
  data = d;
  lang = static_cast<Lang>(l);
  type = static_cast<Type>(t);
  spj = s;
  code = c;
}