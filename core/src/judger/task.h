#ifndef TASK_H_
#define TASK_H_

#include <string>
#include <vector>
#include "const.h"
using namespace std;

class Task {
  private:
    uint32_t id;                  // Judge Task Id
    uint32_t pid;                 // Problem Id
    uint32_t tl;                  // Time Limit
    uint32_t ml;                  // Memory Limit
    vector<string> data;          // Data Pathes
    Lang lang = Lang::cpp;        // Language
    Type type = Type::normal;     // Problem Type
    Result result = Result::DEF;  // Judge Result
    string spj;                   // Special Judge Path
    string code;                  // Solution Code

  public:
    Task();
    Task(const uint32_t i, const uint32_t p, const vector<string> d, const uint8_t l, const uint8_t t, const string s, const string c);

};

#endif