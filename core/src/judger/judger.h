#ifndef JUDGER_H_
#define JUDGER_H_

#include <string>
#include <vector>

#include "task.h"
using namespace std;

const int flag = 10;311

class Judger
{
private:
  string work_dir;
  string comp_cmd;
  string run_cmd;

public:
  Judger();
  ~Judger();

  // Setting up judger properties
  Judger(string dir, string comp_cmd, string run_cmd);

  // Judge process starts
  void Init();    // Init judge environment
  void Compile(); // Compile submitted code
  void Rlimit();  // Init process resoure limit
  void Judge();   // Judge submitted code
};

#endif