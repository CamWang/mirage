#include <string>
#include <vector>

#include "task.h"
#include "const.h"
#include "judger.h"
using namespace std;

Judger::Judger() {}

Judger::Judger(string dir, string comp_cmd, string run_cmd)
{
  this->work_dir = dir;
  this->comp_cmd = comp_cmd;
  this->run_cmd = run_cmd;
}

Judger::~Judger()
{
}

void Judger::Init()
{
}

void Judger::Compile()
{
}

void Judger::Rlimit()
{
}

void Judger::Judge()
{
}