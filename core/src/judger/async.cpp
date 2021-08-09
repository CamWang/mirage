#include "async.h"
#include <napi.h>
#include "judger.h"
#include "task.h"

#include <iostream>

class JudgeWorker : public Napi::AsyncWorker {
  public:
    JudgeWorker(Napi::Function& callback, Judger& judger, Task& task) : Napi::AsyncWorker(callback) {
      this->judger = judger;
      this->task = task;
      // this->emit = emit;
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
      Callback().Call({Env().Undefined(), result});
    }

  private:
    Judger& judger;
    Task& task;
    // Napi::FunctionReference& emit;
};