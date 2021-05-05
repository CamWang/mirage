#include "task.h"

Task::Task() {}

Task::Task(uint32_t id, uint32_t pid, uint32_t tl, uint32_t ml, uint32_t lang, uint32_t type, string data, string spj, string code)
{
  this->id = id;
  this->pid = pid;
  this->tl = tl;
  this->ml = ml;
  this->lang = static_cast<Lang>(lang);
  this->type = static_cast<Type>(type);
  this->data = data;
  this->spj = spj;
  this->code = code;
}