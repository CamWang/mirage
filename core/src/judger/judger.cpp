#include <string>
#include <vector>

#include "task.h"
#include "const.h"
#include "judger.h"
using namespace std;

Judger::Judger() {}

Judger::Judger(string dir, string comp_cmd, string run_cmd) {
  this->work_dir = dir;
  this->comp_cmd = comp_cmd;
  this->run_cmd = run_cmd;
}

void Judger::SetTask(uint32_t id, uint32_t pid, vector<string> data, uint8_t lang, uint8_t type, string spj, string code) {
  this->task = Task(id, pid, data, lang, type, spj, code);
}

void Judger::SetLimit(uint32_t mlmt, uint32_t tlmt) {
  this->mem_limit = mlmt;
  this->time_limit = tlmt;
}

void Judger::Init() {

}

void Judger::Compile() {

}

void Judger::Rlimit() {

}

void Judger::Judge() {

}