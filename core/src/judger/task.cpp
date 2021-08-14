#include "task.h"

Task::Task() {}

Task::Task(string id, uint32_t tl, uint32_t ml, uint32_t lang, uint32_t type, uint32_t mode, string data, string spj, string code) {
  this->id = id;
  this->tl = tl;
  this->ml = ml;
  this->lang = static_cast<Lang>(lang);
  this->type = static_cast<Type>(type);
  this->mode = static_cast<Mode>(mode);
  this->data = data;
  this->spj = spj;
  this->code = code;
}

ostream& operator<< (ostream& os, const Task& task) {
  os << "{id: " + task.id +
    ", time_limit: " + to_string(task.tl) +
    ", memory_limit: " + to_string(task.ml) +
    ", time: " + to_string(task.time),
    ", memory " + to_string(task.memory),
    ", lang: " + to_string(static_cast<int>(task.lang)) +
    ", type: " + to_string(static_cast<int>(task.type)) +
    ", mode: " + to_string(static_cast<int>(task.mode)) +
    ", record: " + to_string(static_cast<long>(task.record)) +
    ", data: " + task.data +
    ", spj: " + task.spj +
    ", code: " + task.code + "}";
  return os;
}

Task::operator string() const {
  return "{id: " + this->id +
    ", time_limit: " + to_string(this->tl) +
    ", memory_limit: " + to_string(this->ml) +
    ", time: " + to_string(this->time) +
    ", memory: " + to_string(this->memory) +
    ", lang: " + to_string(static_cast<int>(this->lang)) +
    ", type: " + to_string(static_cast<int>(this->type)) +
    ", mode: " + to_string(static_cast<int>(this->mode)) +
    ", record: " + to_string(static_cast<long>(this->record)) +
    ", data: " + this->data +
    ", spj: " + this->spj +
    ", code: " + this->code + "}";
}