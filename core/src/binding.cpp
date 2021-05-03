#include <napi.h>
#include "judger/judger.h"
#include <unistd.h>

class Inferno : public Napi::Addon<Inferno> {
 public:
  Inferno(Napi::Env env, Napi::Object exports) {

    DefineAddon(exports, {
      InstanceMethod("increment", &Inferno::Increment),

      InstanceValue("subObject", DefineProperties(Napi::Object::New(env), {
        InstanceMethod("decrement", &Inferno::Decrement)
      }), napi_enumerable),

      InstanceMethod("sleep", &Inferno::Sleep)
    });
  }
 private:

  Napi::Value Increment(const Napi::CallbackInfo& info) {
    return Napi::Number::New(info.Env(), ++value);
  }

  Napi::Value Decrement(const Napi::CallbackInfo& info) {
    return Napi::Number::New(info.Env(), --value);
  }

  Napi::Value Sleep(const Napi::CallbackInfo& info) {
    if (info.Length() < 1) {
      Napi::TypeError::New(info.Env(), "Wrong number of arguments")
        .ThrowAsJavaScriptException();
      return info.Env().Null();
    }

    if (!info[0].IsNumber()) {
      Napi::TypeError::New(info.Env(), "Wrong arguments")
        .ThrowAsJavaScriptException();
      return info.Env().Null();
    }

    int32_t arg0 = info[0].As<Napi::Number>().Int32Value();
    sleep(arg0);
    return Napi::Number::New(info.Env(), arg0);
  }

  uint32_t value = 50;
};

NODE_API_ADDON(Inferno)