#include <sys/stat.h>
#include <sys/wait.h>
#include <sys/resource.h>
#include <sys/types.h>
#include <sys/time.h>
#include <unistd.h>
#include <dirent.h>
#include <errno.h>
#include <fstream>
#include <map>

#include "task.h"
#include "const.h"
#include "judger.h"

const mode_t RWXRXX = (S_IXUSR|S_IRUSR|S_IWUSR|S_IXGRP|S_IRGRP|S_IXOTH);
const string WORK_PATH_PREFIX = "/judger/";

inline bool IsDirExist(const string& filename) {
  struct stat buffer;
  return (stat (filename.c_str(), &buffer) == 0);
}

inline bool compareExtension(const string& fn, const string& en) {
  return fn.substr(fn.find_last_of(".") + 1) == en;
}

inline bool compareFilename(const string& a, const string& b) {
  return a.substr(0, int(a.size()) - 3) == b.substr(0, int(b.size()) - 4);
}

vector<char*> getExecCompCmd(string& str);
string getExecFilename(string& str);
map<string, string> getDataMapFromDir(string& data_dir);

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
  string work_path = this->work_dir = this->work_dir + WORK_PATH_PREFIX + to_string((this->task)->id);
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
  vector<char*> comp_cmd = getExecCompCmd(this->comp_cmd);
  string filename = getExecFilename(this->comp_cmd);
  if (chdir(&this->work_dir[0]) == -1) {
    throw "change directory to " + this->work_dir + " error";
  }
  pid_t pid;
  if((pid = fork()) < 0) {
    throw "compile run out of availiable process";
  } else if (pid == 0) {
    rlimit comp_lmt = {
      this->ctlmt,
      this->ctlmt
    };
    setrlimit(RLIMIT_CPU, &comp_lmt);
    if (execvp(&filename[0], &comp_cmd[0]) == -1) {
      throw "compile command execute error";
    }
  } else {
    int status;
    if (wait(&status) == -1 || status != 0) {
      throw "compile error";
    }
  }
}

void Judger::Sandbox()
{
  chroot(&this->work_dir[0]);
}

void Judger::Judge()
{
  const ushort READ_PIPE = 0;
  const ushort WRITE_PIPE = 1;
  map<string, string> data_map = getDataMapFromDir((this->task)->data);
  int sinPipe[2];
  int soutPipe[2];
  pid_t pid;
  if (pipe(sinPipe) < 0) {
    throw "create stdin pipe error";
  }
  if (pipe(soutPipe) < 0) {
    close(sinPipe[READ_PIPE]);
    close(sinPipe[WRITE_PIPE]);
    throw "create stdoutPipe error";
  }
  if ((pid = fork()) < 0) {
    throw "judge run out of availiable process";
  } else if (pid == 0) {
    if (dup2(sinPipe[READ_PIPE], STDIN_FILENO) == -1) {
      exit(errno);
    }
    if (dup2(soutPipe[WRITE_PIPE], STDOUT_FILENO) == -1) {
      exit(errno);
    }
    if (dup2(soutPipe[WRITE_PIPE], STDERR_FILENO) == -1) {
      exit(errno);
    }
    close(sinPipe[READ_PIPE]);
    close(sinPipe[WRITE_PIPE]);
    close(soutPipe[READ_PIPE]);
    close(soutPipe[WRITE_PIPE]);
    vector<char*> run_cmd = getExecCompCmd(this->run_cmd);
    string filename = getExecFilename(this->run_cmd);
    this->Sandbox();
    if (execlp(&filename[0], &comp_cmd[0]) == -1) {
      exit(errno);
    }
  } else {
    int wstatus;
    rusage usage;
    if (wait4(pid, &wstatus, , &usage))
    for (map<string, string>::iterator d = data_map.begin(); d != data_map.end(); d++) {
      
    }
  }
}

/**
 * Returns the arg[] part of the exec() system call from the command string.
 */
vector<char*> getExecCompCmd(string& str) {
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

/**
 * Returns the filename for exec() system call from the compile command string.
 */
string getExecFilename(string& str) {
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

/**
 * Returns a input file name and output file name pair of certain directory.
 * 
 * The input file must be ended as .in and output file must ended as .out.
 * To pair up the input and output file, the file name before .in/.out must be
 * the same.
 * If input file not present or the files coudn't pair up, every output file will
 * be returned as the value of the map. The key of the map will be "".
 */
map<string, string> getDataMapFromDir(string& data_dir) {
  map<string, string> data_map;
  DIR *dir;
  struct dirent *ent;
  vector<string> files;
  if ((dir = opendir (&data_dir[0])) != NULL) {
    while ((ent = readdir (dir)) != NULL && ent->d_name[0] != '.') {
      files.push_back(string(ent->d_name));
    }
    closedir (dir);
  } else {
    throw "read data files error";
  }
  for (vector<string>::iterator i = files.begin(); i != files.end(); ++i) {
    if (compareExtension(*i, "in")) {
      for (vector<string>::iterator o = files.begin(); o != files.end(); ++o) {
        if (compareExtension(*o, "out") && compareFilename(*i, *o)) {
          data_map.insert(pair<string, string>(*i, *o));
        }
      }
    }
  }
  if (data_map.size() == 0 && files.size() != 0) {
    for (vector<string>::iterator o = files.begin(); o != files.end(); ++o) {
      if (compareExtension(*o, "out")) {
        data_map.insert(pair<string, string>("", *o));
      }
    }
  }
  return data_map;
}