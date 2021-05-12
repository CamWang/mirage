#include "task.h"

Task::Task() {}

Task::Task(uint32_t id, uint32_t pid, uint32_t tl, uint32_t ml, uint32_t lang, uint32_t type, string data, string spj, string code) {
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

ostream& operator<< (ostream& os, const Task& task) {
  os << "{id: " + to_string(task.id) +
    ", pid: " + to_string(task.pid) +
    ", time_limit: " + to_string(task.tl) +
    ", memory_limit: " + to_string(task.ml) +
    ", lang: " + to_string(static_cast<int>(task.lang)) +
    ", type: " + to_string(static_cast<int>(task.type)) +
    ", data: " + task.data +
    ", spj: " + task.spj +
    ", code: " + task.code + "}";
  return os;
}

Task::operator string() const {
  return "{id: " + to_string(this->id) +
    ", pid: " + to_string(this->pid) +
    ", time_limit: " + to_string(this->tl) +
    ", memory_limit: " + to_string(this->ml) +
    ", lang: " + to_string(static_cast<int>(this->lang)) +
    ", type: " + to_string(static_cast<int>(this->type)) +
    ", data: " + this->data +
    ", spj: " + this->spj +
    ", code: " + this->code + "}";
}