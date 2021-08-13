#ifndef JUDGER_H_
#define JUDGER_H_

#include <string>
#include <vector>
#include <iostream>

#include "task.h"
using namespace std;

class Judger {
private:
  string work_dir;
  string source_name;
  string exec_name;
  string comp_cmd;
  string run_cmd;
  uint32_t ctlmt = 10;  // compile time limit
  uint32_t rtlmt = 10;  // run time limit
  int cec = 0;          // user solution run exit code
  int testcase = 0;     // how many testcase total
  bool debug = false;
  bool isPtrace = false;
  bool isSeccomp = false;
  bool isRlimit = false;
  Task* task;

public:
  Judger();
  ~Judger();
  friend ostream& operator<<(ostream& os, const Judger& judger);
  operator string() const;

  // Setting up judger properties
  Judger(string dir, string source_name, string exec_name, string comp_cmd, string run_cmd);

  // Judge process starts
  void Init(Task* task);    // Init judge environment
  void Compile(); // Compile submitted code
  void Sandbox();  // Init process sandbox, being called in Judge();
  void Judge();   // Judge submitted code
  void Clean();   // Do some chores

  int GetCec() {
    return this->cec;
  }

  int GetTestCase() {
    return this->testcase;
  }

  void SetPtrace(bool ptrace) {
    this->isPtrace = ptrace;
  }

  void SetSeccomp(bool seccomp) {
    this->isSeccomp = seccomp;
  }

  void SetRlimit(bool rlimit) {
    this->isRlimit = rlimit;
  }
};

#endif