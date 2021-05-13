#ifndef CONST_H_
#define CONST_H_

#include <string>
#include <iostream>
#include <vector>
using namespace std;

// Task language
enum class Lang {
  c,    // C
  cpp,  // C++
  cs,   // C#
  java, // Java
  py,   // Python
  go,   // Golang
  js,   // JavaScript
  php   // PHP
};

// Task judge result
enum class Result {
  DEF, // Default
  SCE, // Security Check Error
  CE,  // Compile Error
  RE,  // Runtime Error
  TLE, // Time Limit Exxceeded
  MLE, // Memory Limit Exceeded
  OLE, // Output Limit Exceeded
  PE,  // Presentation Error
  WA,  // Wrong Answer
  AC   // Accepted
};

enum class Mode {
  OI,
  ACM
};

// Task type
enum class Type {
  normal,   // in and output file to judge
  output,   // only use output file to judge
  interact  // special judge
};

#endif