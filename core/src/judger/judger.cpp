#include <sys/stat.h>
#include <unistd.h>
#include <fstream>

#include "task.h"
#include "const.h"
#include "judger.h"

const mode_t RWXRXX = (S_IXUSR|S_IRUSR|S_IWUSR|S_IXGRP|S_IRGRP|S_IXOTH);
const string WORK_PATH_PREFIX = "/inferno/";

inline bool IsDirExist(const string& filename) {
  struct stat buffer;
  return (stat (filename.c_str(), &buffer) == 0);
}

vector<char*> getSplitStringArray(string& str);
string getFilename(string& str);

Judger::Judger() {}

Judger::Judger(string dir, string source_name, string exec_name, string comp_cmd, string run_cmd)
{
  this->work_dir = dir;
  this->source_name = source_name;
  this->exec_name = exec_name;
  this->comp_cmd = comp_cmd;
  this->run_cmd = run_cmd;
}

Judger::~Judger() {
  // string work_path = this->work_dir + WORK_PATH_PREFIX + to_string((this->task)->id);
  // if (rmdir(work_path.c_str()) == -1) {
  //   throw "rmdir " + work_path + " error";
  // }
}

ostream & operator<< (ostream & os, const Judger &judger)
{
  os << "{work_dir:" + judger.work_dir + 
    ", source_name:" + judger.source_name +
    ", exec_name:" + judger.exec_name +
    ", comp_cmd:" + judger.comp_cmd +
    ", run_cmd:" + judger.run_cmd + "}";
  return os;
}

Judger::operator string() const
{
  return "{work_dir:" + this->work_dir + 
    ", source_name:" + this->source_name +
    ", exec_name:" + this->exec_name +
    ", comp_cmd:" + this->comp_cmd +
    ", run_cmd:" + this->run_cmd + "}";
}

void Judger::Init(Task* task)
{
  this->task = task;
  // Work__Path defaults to /tmp/inferno
  string inferno_work_path = this->work_dir + WORK_PATH_PREFIX;
  if (!IsDirExist(inferno_work_path)) {
    if (mkdir(inferno_work_path.c_str(), RWXRXX) == -1) {
      throw "mkdir " + inferno_work_path + " error";
    }
  }
  string work_path = this->work_dir + WORK_PATH_PREFIX + to_string((this->task)->id);
  if (IsDirExist(work_path) || mkdir(work_path.c_str(), RWXRXX) == -1) {
    throw "mkdir " + work_path + " error";
  }
  std::ofstream fout;
  string source_file = work_path + "/" + this->source_name;
  fout.open(source_file);
  fout << task->code;
  fout.close();
}

void Judger::Compile()
{
  vector<char*> comp_cmd = getCompCmd(this->comp_cmd);
  string filename = getFilename(this->comp_cmd);
  string work_path = this->work_dir + WORK_PATH_PREFIX + to_string((this->task)->id);
  cout << comp_cmd[0] << endl;
  cout << filename << endl;
  if (chdir(&work_path[0]) == -1) {
    throw "change directory to " + work_path + " error";
  }
  if (execvp(&filename[0], &comp_cmd[0]) == -1) {
    throw "compile error";
  }
}

void Judger::Rlimit()
{
}

void Judger::Judge()
{
}

vector<char*> getCompCmd(string& str) {
  vector<string> words;
  string word = "";
  for (int i = 0; i < int(str.size()); i++) {
    auto x = str[i];
    if (x == ' ') {
      words.push_back(word);
      word = "";
    } else {
      word = word + x;
    }
  }
  words.push_back(word);
  vector<char*> result;
  for (vector<string>::iterator loop = words.begin(); loop != words.end(); ++loop) {
    result.push_back(&(*loop)[0]);
  }
  result.push_back(0);
  return result;
}

string getFilename(string& str) {
  string word = "";
  for (int i = 0; i < int (str.size()); i++) {
    auto x = str[i];
    if (x == ' ') {
      return word;
    } else {
      word = word + x;
    }
  }
  return word;
}