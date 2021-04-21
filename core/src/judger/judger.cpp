#include <string>
#include <vector>

#include "task.h"
#include "const.h"
#include "judger.h"
using namespace std;

Judger::Judger() {}

Judger::Judger(uint32_t i, uint32_t p, vector<string> d, uint8_t l, uint8_t t, string s, string c, string dir) {
  task = Task(i, p, d, l, t, s, c);
  work_dir = dir;
}

void Judger::Init() {

}

void Judger::Compile() {

}

void Judger::Rlimit() {

}

void Judger::Judge() {

}