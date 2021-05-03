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
    string comp_cmd;
    string run_cmd;
    uint32_t mem_limit;
    uint32_t time_limit;

  public:
    // Setting up judger properties
    Judger();
    Judger(string dir, string comp_cmd, string run_cmd);
    void SetTask(uint32_t id, uint32_t pid, vector<string> data, uint8_t lang, uint8_t type, string spj, string code);
    void SetLimit(uint32_t mlmt, uint32_t tlmt);

    // Judge process starts
    void Init();        // Init judge environment
    void Compile();     // Compile submitted code
    void Rlimit();      // Init process resoure limit
    void Judge();       // Judge submitted code
};

#endif