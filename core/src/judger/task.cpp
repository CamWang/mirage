#include "task.h"

Task::Task() {}

Task::Task(uint32_t id, uint32_t pid, vector<string> data, uint8_t lang, uint8_t type, string spj, string code) {
  this->id = id;
  this->pid = pid;
  this->data = data;
  this->lang = static_cast<Lang>(lang);
  this->type = static_cast<Type>(type);
  this->spj = spj;
  this->code = code;
}