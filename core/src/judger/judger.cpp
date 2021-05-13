#include <sys/stat.h>
#include <sys/wait.h>
#include <sys/resource.h>
#include <sys/types.h>
#include <sys/time.h>
#include <fcntl.h>
#include <dirent.h>
#include <unistd.h>
#include <dirent.h>
#include <errno.h>
#include <fstream>
#include <map>

#include "task.h"
#include "const.h"
#include "judger.h"

const mode_t RWXRXX = (S_IXUSR | S_IRUSR | S_IWUSR | S_IXGRP | S_IRGRP | S_IXOTH);
const mode_t RWRW = (S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP);
const string TW = "w";
const string TAP = "a+";
const string TR = "r";
const string WORK_PATH_PREFIX = "/judger/";
const unsigned long BUF_SIZE = 2 << 10; // 2048
const unsigned long SEC_MIC = 1000*1000;
const unsigned long SEC_MIL = 1000;
const unsigned long MIL_MIC = 1000;
const unsigned long MB_B = 1024 * 1024;
const unsigned long KB_B = 1024;
const unsigned long MB_KB = 1024;

inline bool IsDirExist(const string& filename) {
  struct stat buffer;
  return (stat(filename.c_str(), &buffer) == 0);
}

inline bool compareExtension(const string& fn, const string& en) {
  return fn.substr(fn.find_last_of(".") + 1) == en;
}

inline bool compareFilename(const string& a, const string& b) {
  return a.substr(0, int(a.size()) - 3) == b.substr(0, int(b.size()) - 4);
}

// Get compile command char* format for exec() from the compile command string
vector<char*> getExecCompCmd(string& str);
// Get filename for exec() from the compile command string
string getExecFilename(string& str);
// Get data map from data directory, map<[input file namee], [output file name]>
map<string, string> getDataMapFromDir(string& data_dir);
// Remove workdir for better storage management
int removeWorkDir(string& work_dir);
// Filp AC flag at test case i of the record uint64, so the max testcase count is 64
int flipAcFlag(uint64_t *record, int i);
// Add up rusage
void updateTotalTime(uint32_t *total_time, struct rusage *usage);

Judger::Judger() {}

Judger::Judger(string dir, string source_name, string exec_name, string comp_cmd, string run_cmd) {
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

ostream& operator<<(ostream& os, const Judger& judger) {
  os << "{work_dir:" + judger.work_dir +
    ", source_name:" + judger.source_name +
    ", exec_name:" + judger.exec_name +
    ", comp_cmd:" + judger.comp_cmd +
    ", run_cmd:" + judger.run_cmd + "}";
  return os;
}

Judger::operator string() const {
  return "{work_dir:" + this->work_dir +
    ", source_name:" + this->source_name +
    ", exec_name:" + this->exec_name +
    ", comp_cmd:" + this->comp_cmd +
    ", run_cmd:" + this->run_cmd + "}";
}

/**
 * Init judge folder
 */
void Judger::Init(Task* task) {
  this->task = task;
  // Work__Path defaults to /tmp/inferno 
  string inferno_work_path = this->work_dir + WORK_PATH_PREFIX;
  if (!IsDirExist(inferno_work_path)) {
    if (mkdir(inferno_work_path.c_str(), RWXRXX) == -1) {
      throw "mkdir " + inferno_work_path + " error";
    }
  }
  string work_path = this->work_dir = this->work_dir + WORK_PATH_PREFIX + to_string((this->task)->id);
  if (IsDirExist(work_path)) {
    if (removeWorkDir(work_path) == -1) {
      throw "remove work dir error";
    }
  }
  if (mkdir(work_path.c_str(), RWXRXX) == -1) {
    throw "mkdir " + work_path + " error";
  }
  ofstream fout;
  string source_file = work_path + "/" + this->source_name;
  fout.open(source_file);
  fout << task->code;
  fout.close();
}

void Judger::Compile() {
  vector<char*> comp_cmd = getExecCompCmd(this->comp_cmd);
  string filename = getExecFilename(this->comp_cmd);
  if (chdir(this->work_dir.c_str()) == -1) {
    throw "change directory to " + this->work_dir + " error";
  }
  pid_t pid;
  if ((pid = fork()) < 0) {
    throw "compile run out of availiable process";
  } else if (pid == 0) {
    rlimit comp_lmt = {
        this->ctlmt,
        this->ctlmt };
    setrlimit(RLIMIT_CPU, &comp_lmt);
    if (execvp(filename.c_str(), &comp_cmd[0]) == -1) {
      (this->task)->result = Result::CE;
      return;
    }
  } else {
    int status;
    if (wait(&status) == -1 || status != 0) {
      (this->task)->result = Result::CE;
      return;
    }
  }
}

/**
 * Create a sandbox for safe task execution
 * 
 * sandbox tech used:
 * 1. rlimit
 */
void Judger::Sandbox() {
  // set Rlimit
  struct rlimit rlim;
  // set memory limit, send SIGXEGV when exceeds
  rlim = { (this->task)->ml * KB_B, (this->task)->ml * KB_B};
  if (setrlimit(RLIMIT_AS, &rlim) == -1) {
    throw "set static memory limit error";
  }
  if (setrlimit(RLIMIT_DATA, &rlim) == -1) {
    throw "set dynamic memory limit error";
  }
  // set core dump  limit
  rlim = { 0, 0};
  if (setrlimit(RLIMIT_CORE, &rlim) == -1) {
    throw "set core dump limit error";
  }
  // set cpu time limit, send SIGXCPU when exceeds
  uint tl = 1;
  if(!((this->task)->tl < 1000)) {
    tl = (this->task)->tl / 1000;
    if (tl > 30) {
      tl = 30;
    }
  }
  rlim = { tl, tl };
  if (setrlimit(RLIMIT_CPU, &rlim) == -1) {
    throw "set cpu time limit error";
  }
  // set file size limit, send SIGXFSZ when exceeds
  rlim = { 50 * MB_B, 50 * MB_B };
  if (setrlimit(RLIMIT_FSIZE, &rlim) == -1) {
    throw "set file size limit error";
  }
}

/**
 * Run task code and judge result
 */
void Judger::Judge() {
  map<string, string> data_map = getDataMapFromDir((this->task)->data);
  if (data_map.size() < 1) {
    throw "no data in the data directory";
  }
  uint testcase_index = 0;
  uint32_t total_time = 0;
  for (map<string, string>::iterator d = data_map.begin(); d != data_map.end(); d++) {
    // change directory to test data directory
    if (chdir((this->task)->data.c_str()) == -1) {
      throw "change dir to " + (this->task)->data + " error";
    }
    // open test in data
    int tifd;
    if ((tifd = open(d->first.c_str(), O_RDONLY)) == -1) {
      throw "open data " + d->first + " error";
    }
    pid_t pid;
    Mode mode = (this->task)->mode;
    if ((pid = fork()) < 0) {
      throw "judge run out of availiable process";
    } else if (pid == 0) {
      // child process
      if (dup2(tifd, STDIN_FILENO) == -1) {
        exit(errno);
      }
      // send child stdout and stderr to file out and err
      int outfd, errfd;
      string out_file = this->work_dir + "/out";
      string err_file = this->work_dir + "/err";
      if ((outfd = creat(out_file.c_str(), RWRW)) == -1) {
        throw "create out file failed";
      }
      if ((errfd = creat(err_file.c_str(), RWRW)) == -1) {
        throw "create err file failed";
      }
      if (freopen(out_file.c_str(), TW.c_str(), stdout) == NULL) {
        throw "open user out file error";
      }
      if (freopen(err_file.c_str(), TAP.c_str(), stderr) == NULL) {
        throw "open error out file error";
      }
      // change work directory to workpath
      if (chdir(&(this->work_dir[0])) == -1) {
        throw "change child work directory error";
      }
      // run sandbox
      this->Sandbox();
      // run task code
      if (execl("/bin/sh", "sh", "-c", this->run_cmd.c_str(), (char *) NULL) == -1) {
        if (close(outfd) == -1 || close(errfd) == -1 || close(tifd) == -1) {
          cout << "close test out or test err or test in fd error" << endl;
        }
        exit(EXIT_FAILURE);
      }
      if (close(outfd) == -1 || close(errfd) == -1) {
        cout << "close test out or test err fd error" << endl;
      }
      exit(EXIT_SUCCESS);
    } else {
      // parent process
      // get usage
      int stat = 0;
      struct rusage usage;
      if (wait4(pid, &stat, 0, &usage) == -1) {
        return;
      }
      // react to exit code
      switch (stat) {
        case SIGCHLD:
        case SIGALRM:
          if (!alarm(0)) {
            throw "wait4 clean alarm error";
          }
          break;
        case SIGKILL:
        case SIGXCPU:
          (this->task)->result = Result::TLE;
          return;
          break;
        case SIGXFSZ:
          (this->task)->result = Result::OLE;
          return;
          break;
        default:
          (this->task)->result = Result::RE;
          return;
      }
      // calc run time
      updateTotalTime(&total_time,&usage);
      (this->task)->time = total_time / MIL_MIC;
      if ((total_time / MIL_MIC) > (this->task)->tl) {
        (this->task)->result = Result::TLE;
        if (mode == Mode::ACM) {
          return;
        }
      }
      // get run memory
      (this->task)->memory = usage.ru_maxrss;

      // compare
      char ubuf[BUF_SIZE] = {};
      char sbuf[BUF_SIZE] = {};
      FILE* uout, * sout;
      string ufile = "./out";
      string sfile = (this->task)->data + "/" + d->second;
      if (chdir(this->work_dir.c_str()) == -1) {
        throw "change directory to work directory error when compare";
      }
      if ((uout = fopen(ufile.c_str(), TR.c_str())) == NULL) {
        throw "open user out file error";
      }
      if ((sout = fopen(sfile.c_str(), TR.c_str())) == NULL) {
        throw "open standard data: " + d->second + " error";
      }
      while (fgets(sbuf, BUF_SIZE, sout)) {
        if (fgets(ubuf, BUF_SIZE, uout)) {
          for (long unsigned int i = 0; i < sizeof(sbuf); i++) {
            if (sbuf[i] != ubuf[i]) {
              (this->task)->result = Result::WA;
              if (mode == Mode::ACM) {
                return;
              }
            }
          }
        } else {
          (this->task)->result = Result::WA;
          if (mode == Mode::ACM) {
            return;
          }
        }
      }
      if (fclose(uout) == -1 || fclose(sout) == -1) {
        cout << "close user out or standard out error" << endl;
      }
    }
    if (close(tifd) == -1) {
      cout << "close test in file error" << endl;
    }
    if ((this->task)->result == Result::DEF) {
      flipAcFlag(&((this->task)->record), testcase_index);
    }
    testcase_index++;
  }
  if ((this->task)->result == Result::DEF) {
    (this->task)->result = Result::AC;
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
  for (int i = 0; i < int(str.size()); i++) {
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
  DIR* dir;
  struct dirent* ent;
  vector<string> files;
  if ((dir = opendir(data_dir.c_str())) != NULL) {
    while ((ent = readdir(dir)) != NULL && ent->d_name[0] != '.') {
      files.push_back(string(ent->d_name));
    }
    closedir(dir);
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

int removeWorkDir(string& work_dir) {
  dirent* d;
  DIR* dh = opendir(work_dir.c_str());
  if (!dh) {
    if (errno == ENOENT) {
      throw "work directory doesn't exist";
    } else {
      throw "unable to read directory";
    }
    return -1;
  }
  while ((d = readdir(dh)) != NULL) {
    if (d->d_name[0] == '.') {
      continue;
    } else {
      string f = work_dir + "/" + d->d_name;
      if (unlink(f.c_str()) == -1) {
        throw "unlink " + f + " error";
      }
    }
  }
  return rmdir(work_dir.c_str());
}

// Flip the accept for each test case of record
int flipAcFlag(uint64_t *record, int i) {
  if (i < -1) {
    return -1;
  } else if (i == 0) {
    *record = 1;
  } else {
    *record = *record << i;
  }
  return 0;
}

void updateTotalTime(uint32_t *total_time, struct rusage *usage) {
  *total_time += (usage->ru_stime.tv_sec * SEC_MIC);
  *total_time += (usage->ru_utime.tv_sec * SEC_MIC);
  *total_time += (usage->ru_stime.tv_usec);
  *total_time += (usage->ru_utime.tv_usec);
}