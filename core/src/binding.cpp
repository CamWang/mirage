#include <napi.h>
#include "judger/judger.h"
#include <unistd.h>

void throwBindingError(Napi::Env env, const string &msg, const string &name)
{
  throw Napi::Error::New(env, "[Inferno] " + msg + " @binding.cpp - " + name);
}

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
  if (info.Length() < 3)
  {
    throwBindingError(env, "argument number error", "Inferno::Inferno");
  }
  if (!info[0].IsString() || !info[1].IsString() || !info[2].IsString())
  {
    throwBindingError(env, "argument type error", "Inferno::Inferno");
  }
  string dir = info[0].As<Napi::String>().Utf8Value();
  string comp_cmd = info[1].As<Napi::String>().Utf8Value();
  string run_cmd = info[2].As<Napi::String>().Utf8Value();
  this->judger = Judger(dir, comp_cmd, run_cmd);
  return Napi::Boolean::New(env, true);
}

Napi::Value Inferno::SetTask(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() < 9)
  {
    throwBindingError(env, "argument number error", "Inferno::SetTask");
  }
  uint32_t intArr[6];
  string strArr[3];
  for (int i = 0; i < 9; i++)
  {
    if (i < 6)
    {
      if (!info[i].IsNumber())
      {
        throwBindingError(env, "argument type error", "Inferno::SetTask");
      }
      intArr[i] = info[i].As<Napi::Number>().Uint32Value();
    }
    else
    {
      if (!info[i].IsString())
      {
        throwBindingError(env, "argument type error", "Inferno::SetTask");
      }
      strArr[i - 6] = info[i].As<Napi::String>().Utf8Value();
    }
  }
  this->task = Task(intArr[0], intArr[1], intArr[2], intArr[3], intArr[4],
                    intArr[5], strArr[0], strArr[1], strArr[2]);
  return Napi::Boolean::New(env, true);
}

Napi::Object Inferno::Judge(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  this->judger.Init();
  this->judger.Compile();
  this->judger.Rlimit();
  this->judger.Judge();
  Napi::Object result = Napi::Object::New(env);
  result.Set("id", 1);
  return Napi::Number::New(env, 20);
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  Inferno::Init(env, exports);
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init);