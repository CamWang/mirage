#include <napi.h>
#include "judger/judger.h"
#include <unistd.h>

void throwBindingError(Napi::Env env, const string& msg, const string& name);
void log(const string& msg);

class JudgeWorker : public Napi::AsyncWorker {
  public:
    JudgeWorker(Napi::Function& callback, Judger& judger, Task& task) : Napi::AsyncWorker(callback), judger(judger), task(task) {
    }

    ~JudgeWorker() {}

    void Execute() {
      // this->emit.Call({Napi::String::New(Env(), "init")});
      this->judger.Init(&(this->task));
      this->judger.Compile();
      this->judger.Judge();
    }

    void OnOK() {
      Napi::Object result = Napi::Object::New(Env());
      result.Set("id", 1);
      result.Set("cec", this->judger.GetCec());
      result.Set("result", int((this->task).result));
      result.Set("testcase", (this->task).record);
      result.Set("timerun", (this->task).time);
      result.Set("memory", (this->task).memory);
      Callback().Call({result});
    }

  private:
    Judger& judger;
    Task& task;
    // Napi::FunctionReference& emit;
};

class Inferno : public Napi::ObjectWrap<Inferno> {
public:
  Inferno(const Napi::CallbackInfo& info);
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  static Napi::Value CreateNewItem(const Napi::CallbackInfo& info);

private:
  Judger judger;
  Task task;
  Napi::FunctionReference emit;

  Napi::Value SetJudger(const Napi::CallbackInfo& info);
  Napi::Value SetTask(const Napi::CallbackInfo& info);
  Napi::Value Judge(const Napi::CallbackInfo& info);
  Napi::Value JudgeAsync(const Napi::CallbackInfo& info);
};

Napi::Object Inferno::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function func = DefineClass(env, "Inferno", {
    InstanceMethod<&Inferno::SetJudger>("setJudger"),
    InstanceMethod<&Inferno::SetTask>("setTask"),
    InstanceMethod<&Inferno::Judge>("judge"),
    InstanceMethod<&Inferno::JudgeAsync>("judgeAsync"),
  });

  exports.Set("Inferno", func);
  return exports;
}

Inferno::Inferno(const Napi::CallbackInfo& info) : Napi::ObjectWrap<Inferno>(info) {
  if (info.Length() > 0 && info[0].IsFunction()) {
    this->emit = Napi::Persistent(info[0].As<Napi::Function>());
  }
}

Napi::Value Inferno::SetJudger(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (info.Length() < 6)   {
    throwBindingError(env, "argument number error", "Inferno::setJudger()");
  }
  for (int i = 0; i < 6; i++) {
    if (i == 1 || i == 2 || i == 3) {
      if (!info[i].IsBoolean()) {
        throwBindingError(env, "argument type error", "Inferno::setJudger()");
      } else {
        continue;
      }
    } 
    if (!info[i].IsString()) {
      throwBindingError(env, "argument type error", "Inferno::setJudger()");
    }
  }
  string dir = info[0].As<Napi::String>().Utf8Value();
  bool ptrace = info[1].As<Napi::Boolean>().Value();
  bool seccomp = info[2].As<Napi::Boolean>().Value();
  bool rlimit = info[3].As<Napi::Boolean>().Value();
  string source_name = info[4].As<Napi::String>().Utf8Value();
  string exec_name = info[5].As<Napi::String>().Utf8Value();
  string comp_cmd = info[6].As<Napi::String>().Utf8Value();
  string run_cmd = info[7].As<Napi::String>().Utf8Value();
  this->judger = Judger(dir, source_name, exec_name, comp_cmd, run_cmd);
  this->judger.SetPtrace(ptrace);
  this->judger.SetSeccomp(seccomp);
  this->judger.SetRlimit(rlimit);
  return Napi::String::New(env, string(this->judger));
}

Napi::Value Inferno::SetTask(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (info.Length() < 9)   {
    throwBindingError(env, "argument number error", "Inferno::SetTask()");
  }
  uint32_t intArr[6];
  string strArr[3];
  for (int i = 0; i < 9; i++)   {
    if (i < 6)     {
      if (!info[i].IsNumber())       {
        throwBindingError(env, "argument type error", "Inferno::SetTask()");
      }
      intArr[i] = info[i].As<Napi::Number>().Uint32Value();
    }     else     {
      if (!info[i].IsString())       {
        throwBindingError(env, "argument type error", "Inferno::SetTask()");
      }
      strArr[i - 6] = info[i].As<Napi::String>().Utf8Value();
    }
  }
  this->task = Task(intArr[0], intArr[1], intArr[2], intArr[3], intArr[4],
    intArr[5], strArr[0], strArr[1], strArr[2]);
  return Napi::String::New(env, string(this->task));
}

Napi::Value Inferno::Judge(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  this->emit.Call({Napi::String::New(env, "init")});
  try {
    this->judger.Init(&(this->task));
  } catch (string msg) {
    throwBindingError(env, msg, "Judger::Init()");
  }
  this->emit.Call({Napi::String::New(env, "compile")});
  try {
    this->judger.Compile();
  } catch (string msg) {
    throwBindingError(env, msg, "Judger::Compile()");
  }
  this->emit.Call({Napi::String::New(env, "judge")});
  try {
    this->judger.Judge();
  } catch (string msg) {
    throwBindingError(env, msg, "Judger::Judge()");
  }
  Napi::Object result = Napi::Object::New(env);
  result.Set("id", 1);
  result.Set("cec", this->judger.GetCec());
  result.Set("result", int((this->task).result));
  result.Set("testcase", (this->task).record);
  result.Set("timerun", (this->task).time);
  result.Set("memory", (this->task).memory);
  return result;
}

Napi::Value Inferno::JudgeAsync(const Napi::CallbackInfo& info) {
  log("here1");
  Napi::Function callback = info[0].As<Napi::Function>();
  log("here2");
  JudgeWorker* judgeWorker = new JudgeWorker(callback, this->judger, this->task);
  log("here3");
  judgeWorker->Queue();
  log("here4");
  return info.Env().Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  Inferno::Init(env, exports);
  return exports;
}

void throwBindingError(Napi::Env env, const string& msg, const string& name) {
  throw Napi::Error::New(env, "[Inferno] " + msg + " @binding.cpp - " + name);
}

void log(const string& msg) {
  cout << "[Inferno] " << msg << endl;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init);