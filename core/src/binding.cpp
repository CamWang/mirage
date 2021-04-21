#include <napi.h>
#include "judger/judger.h"

class Inferno : public Napi::Addon<Inferno> {
 public:
  Inferno(Napi::Env env, Napi::Object exports) {

    DefineAddon(exports, {
      InstanceMethod("increment", &Inferno::Increment),

      InstanceValue("subObject", DefineProperties(Napi::Object::New(env), {
        InstanceMethod("decrement", &Inferno::Decrement)
      }), napi_enumerable)
    });
  }
 private:

  Napi::Value Increment(const Napi::CallbackInfo& info) {
    return Napi::Number::New(info.Env(), ++value);
  }

  Napi::Value Decrement(const Napi::CallbackInfo& info) {
    return Napi::Number::New(info.Env(), --value);
  }

  uint32_t value = 50;
};

NODE_API_ADDON(Inferno)