#ifndef JUDGER_H_
#define JUDGER_H_

#include <string>
#include <vector>
#include <iostream>

#include "task.h"
using namespace std;

class Judger
{
private:
  string work_dir;
  string source_name;
  string exec_name;
  string comp_cmd;
  string run_cmd;
  Task* task;

public:
  Judger();
  ~Judger();
  friend ostream & operator<<(ostream & os, const Judger &judger);
  operator string() const;

  // Setting up judger properties
  Judger(string dir, string source_name, string exec_name, string comp_cmd, string run_cmd);

  // Judge process starts
  void Init(Task* task);    // Init judge environment
  void Compile(); // Compile submitted code
  void Rlimit();  // Init process resoure limit
  void Judge();   // Judge submitted code
  void Clean();   // Do some chores
};

#endif