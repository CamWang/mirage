#ifndef JUDGER_H_
#define JUDGER_H_

#include <string>
#include <vector>

#include "task.h"
using namespace std;

const int flag = 10;

class Judger {
  private:
    Task task;
    string work_dir;

  public:
    Judger();
    Judger(uint32_t i, uint32_t p, vector<string> d, uint8_t l, uint8_t t, string s, string c, string dir);
    void Init();        // Init
    void Compile();     // Compile
    void Rlimit();      // Set Resource Limit
    void Judge();       // Judge
};

#endif