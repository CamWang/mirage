#ifndef TASK_H_
#define TASK_H_

#include <string>
#include <vector>
#include "const.h"
using namespace std;

class Task
{
private:
  uint32_t id;                 // Judge Task Id
  uint32_t pid;                // Problem Id
  uint32_t tl;                 // Time Limit
  uint32_t ml;                 // Memory Limit
  string data;                 // Data Path
  Lang lang = Lang::cpp;       // Language
  Type type = Type::normal;    // Problem Type
  Result result = Result::DEF; // Judge Result
  string spj;                  // Special Judge Path
  string code;                 // Solution Code

public:
  Task();
  Task(uint32_t id, uint32_t pid, uint32_t tl, uint32_t ml, uint32_t lang, uint32_t type, string data, string spj, string code);
};

#endif