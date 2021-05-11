#include <napi.h>
#include "judger/judger.h"
#include <unistd.h>

void throwBindingError(Napi::Env env, const string &msg, const string &name);
void log(const string& msg);

class Inferno : public Napi::ObjectWrap<Inferno>
{
public:
  Inferno(const Napi::CallbackInfo &info);
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  static Napi::Value CreateNewItem(const Napi::CallbackInfo &info);

private:
  Judger judger;
  Task task;

  Napi::Value SetJudger(const Napi::CallbackInfo &info);
  Napi::Value SetTask(const Napi::CallbackInfo &info);
  Napi::Value Judge(const Napi::CallbackInfo &info);
};

Napi::Object Inferno::Init(Napi::Env env, Napi::Object exports)
{
  Napi::Function func = DefineClass(env, "Inferno", {
    InstanceMethod<&Inferno::SetJudger>("setJudger"),
    InstanceMethod<&Inferno::SetTask>("setTask"),
    InstanceMethod<&Inferno::Judge>("judge"),
  });

  exports.Set("Inferno", func);
  return exports;
}

Inferno::Inferno(const Napi::CallbackInfo &info) : Napi::ObjectWrap<Inferno>(info)
{
  // Napi::Env env = info.Env();
}

Napi::Value Inferno::SetJudger(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() < 5)
  {
    throwBindingError(env, "argument number error", "Inferno::Inferno()");
  }
  for (int i = 0; i < 5; i++) {
    if (!info[i].IsString()) {
      throwBindingError(env, "argument type error", "Inferno::Inferno()");
    }
  }
  string dir = info[0].As<Napi::String>().Utf8Value();
  string source_name = info[1].As<Napi::String>().Utf8Value();
  string exec_name = info[2].As<Napi::String>().Utf8Value();
  string comp_cmd = info[3].As<Napi::String>().Utf8Value();
  string run_cmd = info[4].As<Napi::String>().Utf8Value();
  this->judger = Judger(dir, source_name, exec_name, comp_cmd, run_cmd);
  return Napi::String::New(env, string(this->judger));
}

Napi::Value Inferno::SetTask(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() < 9)
  {
    throwBindingError(env, "argument number error", "Inferno::SetTask()");
  }
  uint32_t intArr[6];
  string strArr[3];
  for (int i = 0; i < 9; i++)
  {
    if (i < 6)
    {
      if (!info[i].IsNumber())
      {
        throwBindingError(env, "argument type error", "Inferno::SetTask()");
      }
      intArr[i] = info[i].As<Napi::Number>().Uint32Value();
    }
    else
    {
      if (!info[i].IsString())
      {
        throwBindingError(env, "argument type error", "Inferno::SetTask()");
      }
      strArr[i - 6] = info[i].As<Napi::String>().Utf8Value();
    }
  }
  this->task = Task(intArr[0], intArr[1], intArr[2], intArr[3], intArr[4],
                    intArr[5], strArr[0], strArr[1], strArr[2]);
  return Napi::String::New(env, string(this->task));
}

Napi::Value Inferno::Judge(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  log("Start Init");
  try {
    this->judger.Init(&(this->task));
  } catch(string msg) {
    throwBindingError(env, msg, "Judger::Init()");
  }
  log("End Init");
  log("Start Compile");
  try {
    this->judger.Compile();
  } catch(string msg) {
    throwBindingError(env, msg, "Judger::Compile()");
  }
  log("End Compile");
  log("Start Judge");
  try {
    this->judger.Judge();
  } catch(string msg) {
    throwBindingError(env, msg, "Judger::Judge()");
  }
  log("End Jduge");
  Napi::Object result = Napi::Object::New(env);
  result.Set("id", 1);
  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  Inferno::Init(env, exports);
  return exports;
}

void throwBindingError(Napi::Env env, const string &msg, const string &name)
{
  throw Napi::Error::New(env, "[Inferno] " + msg + " @binding.cpp - " + name);
}

void log(const string& msg) {
  cout << "[Inferno] " << msg << endl;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init);