#ifndef INFERNO_ASYNC_H_
#define INFERNO_ASYNC_H_

#include <napi.h>
#include "task.h"
#include "judger.h"

class JudgeWorker : public Napi::AsyncWorker {
  public:
    JudgeWorker(Napi::Function& callback, Judger& judger, Task& task);
    ~JudgeWorker();
    void Execute();
    void OnOK();

  private:
    Judger& judger;
    Task& task;
    // Napi::FunctionReference& emit;
};

#endif  // INFERNO_H_